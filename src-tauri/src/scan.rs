use lofty::{self, config::ParseOptions, file::AudioFile, probe::Probe, tag::Accessor, tag::Tag};
use std::{collections::HashMap, env, fs, path};

use crate::utils;

const IGNORED_ARTISTS: &[&str] = &["Various Artists"];
const TRACK_COUNT_THRESHOLD: usize = 3;
const ALLOWED_EXTENSIONS: &[&str] = &["mp3", "wav", "aac", "m4a"];

/// Lists artist directories under `music_path`, skipping non-dirs and `IGNORED_ARTISTS`.
///
/// # Errors
///
/// Returns `Err` if `music_path` can't be read, or if reading any entry inside it fails.
fn scan_artists(music_path: &path::Path) -> Result<Vec<path::PathBuf>, String> {
    let artists = fs::read_dir(music_path).map_err(|e| e.to_string())?;
    let mut result: Vec<path::PathBuf> = vec![];

    for artist in artists {
        let artist = artist.map_err(|e| e.to_string())?;
        let artist_path = artist.path();

        if !artist_path.is_dir() {
            continue;
        }

        let artist_dir_name = artist.file_name();
        let artist_name = artist_dir_name.to_string_lossy();
        if IGNORED_ARTISTS.contains(&artist_name.as_ref()) {
            continue;
        }

        result.push(artist_path);
    }

    Ok(result)
}

/// Lists album directories under `artist_path`, skipping non-dirs.
///
/// # Errors
///
/// Returns `Err` if `artist_path` can't be read, or if reading any entry inside it fails.
fn scan_albums(artist_path: &path::Path) -> Result<Vec<path::PathBuf>, String> {
    let albums = fs::read_dir(artist_path).map_err(|e| e.to_string())?;
    let mut result: Vec<path::PathBuf> = vec![];

    for album in albums {
        let album = album.map_err(|e| e.to_string())?;
        let album_path = album.path();

        if !album_path.is_dir() {
            continue;
        }
        result.push(album_path);
    }
    Ok(result)
}

fn upload_cover(tag: &Option<Tag>, cover_path: &str) -> Result<Option<String>, String> {
    let Some(picture) = tag.as_ref().and_then(|t| t.pictures().first()) else {
        return Ok(None);
    };

    let Some(cover_mime_type) = picture.mime_type() else {
        return Ok(None);
    };

    let mut cover_path_ext = cover_path.to_string();
    let Some(cover_ext) = cover_mime_type.ext() else {
        return Ok(None);
    };
    cover_path_ext.push('.');
    cover_path_ext.push_str(cover_ext);

    fs::write(&cover_path_ext, picture.data()).map_err(|e| e.to_string())?;

    Ok(Some(cover_path_ext))
}

/// Reads year from a tag. Returns `0` if
/// track is `None` or has no readable tag.
///
/// # Errors
///
/// Returns `Err` if track exists but its audio file can't be parsed by [`lofty`].
fn get_album_year(tag: &Option<Tag>) -> Result<u16, String> {
    let album_year = tag
        .as_ref()
        .and_then(|t| t.date())
        .map(|t| t.year)
        .unwrap_or(0);

    Ok(album_year)
}

/// Returns `album_path`'s final path component as a `String`, or `None` if it has none.
fn get_album_name(album_path: &path::Path) -> Option<String> {
    let album_dir_name = album_path.file_name()?;
    Some(album_dir_name.to_string_lossy().to_string())
}

/// Sums the duration, in seconds, of every track in `tracks`. Tags aren't parsed
/// (only audio properties), since only duration is needed here.
///
/// # Errors
///
/// Returns `Err` if any track's audio file can't be parsed by [`lofty`].
fn get_album_duration(tracks: &Vec<fs::DirEntry>) -> Result<u16, String> {
    let mut album_duration: u16 = 0;
    let parse_options = ParseOptions::new().read_tags(false);

    for track in tracks {
        let tagged_file = Probe::open(track.path())
            .map_err(|e| e.to_string())?
            .options(parse_options)
            .read()
            .map_err(|e| e.to_string())?;
        let duration = tagged_file.properties().duration();
        album_duration += duration.as_secs() as u16;
    }

    Ok(album_duration)
}

/// Builds a [`ScanResult`] for the album at `album_path`. Returns `Ok(None)` if the
/// album has fewer tracks than [`TRACK_COUNT_THRESHOLD`].
///
/// # Errors
///
/// Returns `Err` if `album_path` can't be read, or if any track inside it can't be parsed.
fn scan_album_metadata(
    app: &tauri::AppHandle,
    album_path: &path::Path,
    artist_name: &str,
    existing_map: &HashMap<(String, String), AlbumExisting>,
) -> Result<Option<ScanResult>, String> {
    let album_name = get_album_name(&album_path).unwrap_or_default();

    let tracks: Vec<_> = fs::read_dir(album_path)
        .map_err(|e| e.to_string())?
        .filter_map(|e| e.ok())
        .filter(|e| {
            e.path()
                .extension()
                .and_then(|ext| ext.to_str())
                .map(|ext| ALLOWED_EXTENSIONS.contains(&ext))
                .unwrap_or(false)
        })
        .collect();

    let track_count = tracks.len();

    if let Some(existing) = existing_map.get(&(artist_name.to_string(), album_name.clone())) {
        let should_resurface = track_count > existing.track_count;
        if !should_resurface {
            return Ok(None);
        }
    }

    if track_count < TRACK_COUNT_THRESHOLD {
        return Ok(None);
    }
    let first_track = tracks.first();
    let first_track_tag = utils::get_tag(&first_track)?;

    let album_year = get_album_year(&first_track_tag)?;
    let album_duration = get_album_duration(&tracks)?;

    let cover_path = utils::construct_cover_path(app, artist_name, &album_name)?;
    let album_cover_path = upload_cover(&first_track_tag, &cover_path)?;

    let entry = ScanResult {
        artist: artist_name.to_string(),
        album: album_name,
        track_count,
        duration_seconds: album_duration,
        year: album_year,
        cover_path: album_cover_path,
    };

    return Ok(Some(entry));
}

/// Walks `~/Music/mp3` (assumed `root/Artist/Album/*.audio_files` layout) and returns
/// one [`ScanResult`] per qualifying album.
///
/// # Errors
///
/// Returns `Err` if the library root or any artist/album directory inside it can't be
/// read, or if a track file can't be parsed.
#[tauri::command]
pub fn scan_library(
    app: tauri::AppHandle,
    existing: Vec<AlbumExisting>,
) -> Result<Vec<ScanResult>, String> {
    let home = env::var("HOME").expect("HOME environment variable must be set");
    let music_path = path::Path::new(&home).join("Music").join("mp3");

    let mut result = vec![];

    let existing_map: HashMap<(String, String), AlbumExisting> = existing
        .into_iter()
        .map(|e| ((e.artist.clone(), e.album.clone()), e))
        .collect();

    let artists = scan_artists(&music_path)?;

    for artist_path in artists {
        let artist_name = artist_path
            .file_name()
            .map(|n| n.to_string_lossy().to_string())
            .unwrap_or_default();

        let albums = scan_albums(&artist_path)?;
        for album_path in albums {
            let album_metadata =
                scan_album_metadata(&app, &album_path, &artist_name, &existing_map)?;

            if let Some(entry) = album_metadata {
                result.push(entry);
            }
        }
    }

    result.sort_by(|a, b| {
        (a.artist.to_lowercase(), a.album.to_lowercase())
            .cmp(&(b.artist.to_lowercase(), b.album.to_lowercase()))
    });

    Ok(result)
}

/// One scanned album, ready to display or insert into the `albums` table.
#[derive(serde::Serialize)]
pub struct ScanResult {
    artist: String,
    album: String,
    track_count: usize,
    duration_seconds: u16,
    year: u16,
    cover_path: Option<String>,
}

/// One album already in the `albums` table, as passed in from TypeScript to let
/// [`scan_library`] skip re-parsing tags for albums that haven't changed.
#[derive(serde::Deserialize)]
pub struct AlbumExisting {
    artist: String,
    album: String,
    track_count: usize,
}

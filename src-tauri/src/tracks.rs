use std::fs;

use lofty::{
    file::{AudioFile, TaggedFileExt},
    probe::Probe,
    tag::Accessor,
};

use crate::scan::ALLOWED_EXTENSIONS;

/// Lists the playable tracks directly inside `album_path`, ordered by tag track number
/// (missing numbers last), then by path. `artist` is applied to every track.
///
/// # Errors
///
/// Returns `Err` if `album_path` can't be read, has no supported audio files, or a track
/// can't be parsed by [`lofty`].
#[tauri::command]
pub fn list_tracks(album_path: String, artist: String) -> Result<Vec<Track>, String> {
    let mut result: Vec<Track> = vec![];
    let tracks: Vec<_> = fs::read_dir(&album_path)
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

    if tracks.is_empty() {
        return Err(format!("no supported audio files in {album_path}"));
    }

    for track in tracks {
        let tagged_file = Probe::open(track.path())
            .map_err(|e| e.to_string())?
            .read()
            .map_err(|e| e.to_string())?;
        let duration = tagged_file.properties().duration();
        let tag = tagged_file
            .primary_tag()
            .or_else(|| tagged_file.first_tag());

        let track_title = tag
            .and_then(|t| t.title())
            .map(|t| t.to_string())
            .unwrap_or_else(|| track.file_name().to_string_lossy().to_string());

        let track_number = tag
            .and_then(|t| t.track())
            .and_then(|n| u16::try_from(n).ok());

        let entry = Track {
            path: track.path().to_string_lossy().to_string(),
            title: track_title,
            artist: artist.clone(),
            number: track_number,
            duration_seconds: duration.as_secs() as u16,
        };

        result.push(entry);
    }

    result.sort_by_key(|t| (t.number.unwrap_or(u16::MAX), t.path.clone()));

    Ok(result)
}

/// One playable file of an album. `title` falls back to the file name when untagged.
#[derive(serde::Serialize)]
pub struct Track {
    path: String,
    title: String,
    artist: String,
    number: Option<u16>,
    duration_seconds: u16,
}

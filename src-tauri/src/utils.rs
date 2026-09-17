use fnv::FnvHasher;
use lofty::{file::TaggedFileExt, tag::Tag};
use std::{
    fs::{self, DirEntry},
    hash::Hasher,
};
use tauri::Manager;

pub fn hash_cover_filename(artist_name: &str, album_name: &str) -> String {
    let mut hasher = FnvHasher::default();
    hasher.write(format!("{artist_name}-{album_name}").as_bytes());
    let hash: u64 = hasher.finish();

    format!("{:016x}", hash)
}

pub fn construct_cover_path(
    app: &tauri::AppHandle,
    artist_name: &str,
    album_name: &str,
) -> Result<String, String> {
    let data_dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    let covers_dir_path = data_dir.join("covers");
    fs::create_dir_all(&covers_dir_path).map_err(|e| e.to_string())?;
    let cover_name = hash_cover_filename(artist_name, album_name);

    let cover_path = covers_dir_path.join(cover_name);

    Ok(cover_path.to_string_lossy().to_string())
}

pub fn get_tag(track: &Option<&DirEntry>) -> Result<Option<Tag>, String> {
    let tagged_file = track
        .map(|t| lofty::read_from_path(t.path()))
        .transpose()
        .map_err(|e| e.to_string())?;
    let tag = tagged_file
        .as_ref()
        .and_then(|f| f.primary_tag().or_else(|| f.first_tag()));

    Ok(tag.cloned())
}

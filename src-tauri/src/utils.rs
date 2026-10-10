use fnv::FnvHasher;
use lofty::{file::TaggedFileExt, tag::Tag};
use std::{
    fs::{self, DirEntry},
    hash::Hasher,
    path,
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

/// Removes every cached cover by deleting the covers directory.
///
/// # Errors
///
/// Returns `Err` if the app data dir can't be resolved or the directory can't be removed.
#[tauri::command]
pub fn clear_covers(app: tauri::AppHandle) -> Result<(), String> {
    let data_dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    match fs::remove_dir_all(data_dir.join("covers")) {
        Err(e) if e.kind() != std::io::ErrorKind::NotFound => Err(e.to_string()),
        _ => Ok(()),
    }
}

/// Resolves where `tauri-plugin-sql` stores `albumz.db`, with the home dir shown as `~`.
///
/// # Errors
///
/// Returns `Err` if the app config dir or the home dir can't be resolved.
#[tauri::command]
pub fn get_db_path(app: tauri::AppHandle) -> Result<String, String> {
    let config_dir = app.path().app_config_dir().map_err(|e| e.to_string())?;
    let home_dir = app.path().home_dir().map_err(|e| e.to_string())?;
    let db_path = config_dir.join("albumz.db");

    let display_path = match db_path.strip_prefix(&home_dir) {
        Ok(relative) => path::Path::new("~").join(relative),
        Err(_) => db_path,
    };

    Ok(display_path.to_string_lossy().to_string())
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

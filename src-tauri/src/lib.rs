mod migrations;
mod scan;
mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:albumz.db", migrations::get_migrations())
                .build(),
        )
        .invoke_handler(tauri::generate_handler![scan::scan_library])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

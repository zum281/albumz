use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "create_initial_tables",
        sql: "CREATE TABLE albums (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  artist TEXT NOT NULL,
                  album TEXT NOT NULL,
                  year INTEGER NOT NULL,
                  duration_seconds REAL NOT NULL,
                  track_count INTEGER NOT NULL,
                  cover_path TEXT,
                  rating REAL,
                  listened INTEGER NOT NULL DEFAULT 0,
                  ignored INTEGER NOT NULL DEFAULT 0
              );",
        kind: MigrationKind::Up,
    }]
}

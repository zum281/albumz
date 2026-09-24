use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE albums (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  artist TEXT NOT NULL,
                  album TEXT NOT NULL,
                  year INTEGER NOT NULL,
                  duration_seconds INTEGER NOT NULL,
                  track_count INTEGER NOT NULL,
                  cover_path TEXT,
                  rating INTEGER CHECK(rating BETWEEN 1 AND 5),
                  listened INTEGER NOT NULL DEFAULT 0 CHECK(listened IN (0, 1)),
                  ignored INTEGER NOT NULL DEFAULT 0 CHECK(ignored IN (0, 1)),
                  media_type TEXT NOT NULL DEFAULT 'digital',
                  source TEXT NOT NULL DEFAULT 'scan',
                  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
                  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
                  path TEXT,
                  UNIQUE(artist, album)
              ) STRICT;",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "set_listened_on_rating",
            sql: "CREATE TRIGGER set_listened_on_rating
                      AFTER UPDATE OF rating ON albums
                      WHEN NEW.rating IS NOT NULL AND OLD.listened = 0
                      BEGIN
                        UPDATE albums SET listened = 1
                        WHERE id = NEW.id;
                      END;

                ",
            kind: MigrationKind::Up,
        },
    ]
}

import Database from "@tauri-apps/plugin-sql";

export const getDb = async (): Promise<Database> => {
  return await Database.load("sqlite:albumz.db");
};

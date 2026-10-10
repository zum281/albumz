import { queryOptions } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";

export const dbPathQueryOptions = () => {
  return queryOptions({
    queryKey: ["db", "path"],
    queryFn: () => invoke<string>("get_db_path"),
  });
};

export const getDb = async (): Promise<Database> => {
  return await Database.load("sqlite:albumz.db");
};

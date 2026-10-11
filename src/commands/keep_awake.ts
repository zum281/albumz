import { invoke } from "@tauri-apps/api/core";

export const setKeepAwake = async (enabled: boolean): Promise<void> => {
  try {
    await invoke("set_keep_awake", { enabled });
  } catch (err) {
    console.error("[keep-awake] set_keep_awake failed:", err);
  }
};

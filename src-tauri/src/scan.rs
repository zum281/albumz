#[tauri::command]
pub fn scan_library() {
  println!("I was invoked from JavaScript!");
}

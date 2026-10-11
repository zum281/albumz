use std::sync::Mutex;

/// Holds the active keep-awake handle; dropping it releases the OS assertion.
#[derive(Default)]
pub struct AwakeState(Mutex<Option<keepawake::KeepAwake>>);

/// Prevents the display from sleeping and the screen from locking while `enabled`.
///
/// # Errors
///
/// Returns `Err` if the state lock is poisoned or the OS refuses the assertion.
#[tauri::command]
pub fn set_keep_awake(state: tauri::State<AwakeState>, enabled: bool) -> Result<(), String> {
    let mut guard = state.0.lock().map_err(|e| e.to_string())?;

    if !enabled {
        *guard = None;
        return Ok(());
    }
    if guard.is_some() {
        return Ok(());
    }

    let awake = keepawake::Builder::default()
        .display(true)
        .idle(true)
        .reason("Fullscreen visualizer")
        .app_name("albumz")
        .app_reverse_domain("com.zusk.albumz")
        .create()
        .map_err(|e| e.to_string())?;
    *guard = Some(awake);

    Ok(())
}

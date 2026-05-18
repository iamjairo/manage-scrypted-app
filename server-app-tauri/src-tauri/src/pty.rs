use dashmap::DashMap;
use portable_pty::{native_pty_system, CommandBuilder, MasterPty, PtySize};
use std::io::{Read, Write};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Emitter};

struct PtySession {
    writer: Arc<Mutex<Box<dyn Write + Send>>>,
    master: Arc<Mutex<Box<dyn MasterPty + Send>>>,
}

// SAFETY: portable-pty MasterPty is documented as Send.
unsafe impl Send for PtySession {}
unsafe impl Sync for PtySession {}

lazy_static::lazy_static! {
    static ref SESSIONS: DashMap<String, PtySession> = DashMap::new();
}

pub fn open(app: AppHandle, id: String, cols: u16, rows: u16) -> Result<(), String> {
    let pty_system = native_pty_system();
    let pair = pty_system
        .openpty(PtySize { rows, cols, pixel_width: 0, pixel_height: 0 })
        .map_err(|e| e.to_string())?;

    let shell = std::env::var("SHELL").unwrap_or_else(|_| "/bin/bash".into());
    let home = std::env::var("HOME").unwrap_or_else(|_| "/root".into());

    let mut cmd = CommandBuilder::new(&shell);
    cmd.cwd(&home);
    cmd.env("TERM", "xterm-256color");

    pair.slave
        .spawn_command(cmd)
        .map_err(|e| e.to_string())?;

    // Take writer and reader before moving master into Arc.
    let writer = pair.master.take_writer().map_err(|e| e.to_string())?;
    let mut reader = pair.master.try_clone_reader().map_err(|e| e.to_string())?;

    let writer = Arc::new(Mutex::new(writer));
    let master: Arc<Mutex<Box<dyn MasterPty + Send>>> =
        Arc::new(Mutex::new(pair.master));

    let app_clone = app.clone();
    let id_clone = id.clone();
    std::thread::spawn(move || {
        let mut buf = [0u8; 4096];
        loop {
            match reader.read(&mut buf) {
                Ok(0) | Err(_) => {
                    let _ = app_clone.emit(&format!("term:exit:{}", id_clone), ());
                    break;
                }
                Ok(n) => {
                    let data = String::from_utf8_lossy(&buf[..n]).to_string();
                    let _ = app_clone.emit(&format!("term:data:{}", id_clone), data);
                }
            }
        }
        SESSIONS.remove(&id_clone);
    });

    SESSIONS.insert(id, PtySession { writer, master });
    Ok(())
}

pub fn write(id: &str, data: &str) -> Result<(), String> {
    // Clone the Arc out while holding the DashMap ref, then drop the ref
    // before using `?` — avoids borrow-checker lifetime conflicts.
    let writer = SESSIONS
        .get(id)
        .map(|s| Arc::clone(&s.writer))
        .ok_or_else(|| "session not found".to_string())?;
    // Bind result to a named variable so the MutexGuard temporary is dropped
    // at the `;` rather than as part of the implicit tail-expression return.
    let result = writer
        .lock()
        .map_err(|e| e.to_string())?
        .write_all(data.as_bytes())
        .map_err(|e| e.to_string());
    result
}

pub fn resize(id: &str, cols: u16, rows: u16) -> Result<(), String> {
    let master = SESSIONS
        .get(id)
        .map(|s| Arc::clone(&s.master))
        .ok_or_else(|| "session not found".to_string())?;
    let result = master
        .lock()
        .map_err(|e| e.to_string())?
        .resize(PtySize { rows, cols, pixel_width: 0, pixel_height: 0 })
        .map_err(|e| e.to_string());
    result
}

pub fn close(id: &str) -> Result<(), String> {
    SESSIONS.remove(id);
    Ok(())
}

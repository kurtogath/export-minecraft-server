// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::command;

#[command]
fn run_backup() {
  println!("Backup");
}


fn main() {
    // export_minecraft_server_lib::run();
    tauri::Builder::default().invoke_handler(tauri::generate_handler![run_backup]).run(tauri::generate_context!()).expect("failed to run backup");
}

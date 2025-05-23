//This is where the windows is created
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setMainMenu } from "../src/components/menu";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, "public")
    : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        title: "Exportar mundo de Exilor",
        icon: "../src/assets/Caracol.webp",
        webPreferences: {
            preload: path.join(__dirname, "preload.mjs"),
        },
        width: 800,
        height: 600,
        minWidth: 900,
        minHeight: 600,
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send(
            "main-process-message",
            new Date().toLocaleString(),
        );
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(path.join(RENDERER_DIST, "index.html"));
    }

    setMainMenu(win);
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    createWindow();

    //
    ipcMain.handle("dialog:openFile", async () => {
        // Abrir el diálogo para seleccionar un archivo
        const result = await dialog
            .showOpenDialog({
                defaultPath: app.getPath("desktop"),
                title: "Seleccionar Zip",
                filters: [{ name: "Zip", extensions: ["zip", "rar"] }],
                properties: ["openFile"],
            })
            .then((result) => {
                if (!result.canceled) {
                    return result.filePaths[0];
                }
                return "";
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });

        return result;
    });
});

import { Menu, app, BrowserWindow, ipcMain, dialog } from "electron";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
const setMainMenu = (mainWindow) => {
    const template = [
        {
            label: "Exilor",
            submenu: [
                {
                    label: "Abrir devtools",
                    click: () => {
                        mainWindow.webContents.openDevTools();
                    },
                },
                { type: "separator" },
            ],
        },
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forceReload" },
                { role: "toggleDevTools" },
                { type: "separator" },
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, "public")
    : RENDERER_DIST;
let win;
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
    win.webContents.on("did-finish-load", () => {
        win == null
            ? void 0
            : win.webContents.send(
                  "main-process-message",
                  /* @__PURE__ */ new Date().toLocaleString(),
              );
    });
    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(path.join(RENDERER_DIST, "index.html"));
    }
    setMainMenu(win);
}
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
app.whenReady().then(() => {
    createWindow();
    ipcMain.handle("dialog:openFile", async () => {
        const result = await dialog
            .showOpenDialog({
                defaultPath: app.getPath("desktop"),
                title: "Seleccionar Zip",
                filters: [{ name: "Zip", extensions: ["zip", "rar"] }],
                properties: ["openFile"],
            })
            .then((result2) => {
                if (!result2.canceled) {
                    return result2.filePaths[0];
                }
                return "";
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
        return result;
    });
});
export { MAIN_DIST, RENDERER_DIST, VITE_DEV_SERVER_URL };

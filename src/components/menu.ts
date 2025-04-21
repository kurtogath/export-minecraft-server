import { BrowserWindow, Menu } from "electron";

export const setMainMenu = (mainWindow : BrowserWindow): void => {
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: "Exilor",
            submenu: [
                {
                    label: "Abrir devtools",
                    click: () => {
                        mainWindow.webContents.openDevTools()
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

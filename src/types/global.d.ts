export {};

declare global {
    interface Window {
        ipcRenderer: {
            openFileDialog: () => Promise<string[]>;
        };
    }
}

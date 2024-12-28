const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = true
const isMac = process.platform === 'darwin';

function createWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Continue',
        width: isDev ? 1000 : 500,
        height: 500
    });

    //* Open devtools
    if(isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});
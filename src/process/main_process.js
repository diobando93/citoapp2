const {BrowserWindow, ipcMain} = require('electron');

function createWindow(){
    const win = new BrowserWindow({
            width: 800,
            heigth: 500,
            webPreferences: {
                nodeIntegration: true
            }
    });
    win.loadFile('src/ui//templates/main.html')
};

module.exports = {createWindow};

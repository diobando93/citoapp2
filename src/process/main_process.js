const { BrowserWindow, ipcMain, app } = require("electron");
const { recibir } = require("./pedido_process.js");
const { consultar } = require("./resultado_process.js");
const { doctores } = require("./doctores_process.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    heigth: 500,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("src/ui//templates/main.html");
}

ipcMain.on("envio-datos-paciente", (e, args) => {
  app.allowRendererProcessReuse = false;
  app.whenReady().then(recibir);
});

ipcMain.on("consulta-datos-paciente", (e, args) => {
  app.whenReady().then(consultar);
  app.allowRendererProcessReuse = false;
});

ipcMain.on("medicos-crear-eliminar", (e, args) => {
  app.whenReady().then(doctores);
  app.allowRendererProcessReuse = false;
});

module.exports = { createWindow };

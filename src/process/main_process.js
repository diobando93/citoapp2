const { BrowserWindow, ipcMain, app } = require("electron");
const { recibir } = require("./pedido_process.js");
const { consultar } = require("./resultado_process.js");
const { doctores } = require("./doctores_process.js");

let mainWindows;
let pedidosWindows;

//falta crear una pantalla por cada icono del menu por ejemplo pantalla pedidos
//como esta el process se confunde

/*
app.on("ready", () => {
  mainWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindows.loadFile("src/ui//templates/main.html");
});
*/

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
  //pedidosWindows = new BrowserWindow({ width: 800, height: 800 });
  //pedidosWindows.loadFile("src/ui/templates/pedidos.html");
  //recibir;
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

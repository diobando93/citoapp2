//Invoca a todos los process
const { BrowserWindow, ipcMain, app } = require("electron");
const { recibir } = require("./pedido_process.js");
const { consultar } = require("./resultado_process.js");
const { pacientes } = require("./pacientes_process.js");
const { doctores } = require("./doctores_process.js");
const { estab } = require("./establecimientos_process.js");
const { reports } = require("./informes_process.js");
const { findPatient } = require("./pedidosconfirm_process.js");

//Variables para creaci�n de ventanas
let mainWindows;
let pedidosWindow;
let resultadosWindow;
let doctoresWindow;
let establecimientosWindow;
let pacientesWindow;

//falta crear una pantalla por cada icono del menu por ejemplo pantalla pedidos
//como esta el process se confunde

app.on("ready", () => {
  abrirMain();
  app.whenReady().then(recibir);
  app.whenReady().then(consultar);
  app.whenReady().then(pacientes);
  app.whenReady().then(reports);
  app.whenReady().then(doctores);
  app.whenReady().then(estab);
  app.whenReady().then(findPatient);

  //---------------OPCION PEDIDOS
  ipcMain.on("envio-datos-paciente", (e, args) => {
    abrirPantalla(args[0], args[1]);
  });

  //---------------OPCION RESULTADOS
  ipcMain.on("consulta-datos-paciente", (e, args) => {
    abrirPantalla(args[0], args[1]);
  });

  //---------------OPCION RETIRO DE INFORMES
  ipcMain.on("informes-consultar", (e, args) => {
    abrirPantalla(args[0], args[1]);
    console.log(args[0]);
  });

  //---------------OPCION PACIENTES
  ipcMain.on("paciente-consultar", (e, args) => {
    abrirPantalla(args[0], args[1]);
  });

  //---------------OPCION DOCTORES
  ipcMain.on("medicos-crear-eliminar", (e, args) => {
    abrirPantalla(args[0], args[1]);
  });

  //---------------OPCION ESTABLECIMIENTOS
  ipcMain.on("establecimientos-crear-eliminar", (e, args) => {
    abrirPantalla(args[0], args[1]);
  });

  //---------------SALIR
  ipcMain.on("exit-app", (e, args) => {
    console.log(args);
    mainWindows.close();
    mainWindows.destroy();
  });
});

function abrirPantalla(direccion, codRegreso) {
  let ventana = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 800,
    show: false,
  });
  ventana.loadFile(direccion);

  ventana.show();
  mainWindows.hide();

  ipcMain.once(codRegreso, (e, args) => {
    console.log(args);
    mainWindows.show();
    ventana.close();
    ventana.destroy();
  });
}

function abrirMain() {
  mainWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 800,
  });
  mainWindows.loadFile("src/ui//templates/main.html");
}

/*
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
*/
/*
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
*/

//module.exports = { createWindow };

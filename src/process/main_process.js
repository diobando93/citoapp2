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
  abrirMain("src/ui//templates/main.html");
  app.whenReady().then(recibir);
  app.whenReady().then(consultar);
  app.whenReady().then(pacientes);
  app.whenReady().then(reports);
  app.whenReady().then(doctores);
  app.whenReady().then(estab);
  app.whenReady().then(findPatient);

  //---------------OPCION PEDIDOS
  ipcMain.on("envio-datos-paciente", (e, args) => {
    abrirPantalla(args[0], args[1], args[2]);
  });

  //---------------OPCION PEDIDO Existe
  ipcMain.on("pantalla1", (e, args) => {
    console.log(args[3]);
    abriPantallaPedidos(args[0], args[1], args[2], args[3]);
  });

  //---------------OPCION PEDIDO No Existe
  ipcMain.on("pantalla2", (e, args) => {
    console.log(args[3]);
    abriPantallaPedidos(args[0], args[1], args[2], args[3]);
  });

  //---------------OPCION RESULTADOS
  ipcMain.on("consulta-datos-paciente", (e, args) => {
    abrirPantalla(args[0], args[1], args[2]);
  });

  //---------------OPCION RETIRO DE INFORMES
  ipcMain.on("informes-consultar", (e, args) => {
    abrirPantalla(args[0], args[1], args[2]);
  });

  //---------------OPCION PACIENTES
  ipcMain.on("paciente-consultar", (e, args) => {
    abrirPantalla(args[0], args[1], args[2]);
  });

  //---------------OPCION DOCTORES
  ipcMain.on("medicos-crear-eliminar", (e, args) => {
    abrirPantalla(args[0], args[1], args[2]);
  });

  //---------------OPCION ESTABLECIMIENTOS
  ipcMain.on("establecimientos-crear-eliminar", (e, args) => {
    abrirPantalla(args[0], args[1], args[2]);
  });

  //---------------SALIR
  ipcMain.on("exit-app", (e, args) => {
    console.log(args);
    mainWindows.close();
    mainWindows.destroy();
  });
});

function abrirPantalla(direccion1, direccion2, codRegreso) {
  let ventana = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 800,
    show: false,
  });

  ventana.loadFile(direccion1);

  ventana.show();
  mainWindows.close();
  mainWindows.destroy();

  ipcMain.once(codRegreso, (e, args) => {
    console.log(args);
    abrirMain(direccion2);
    ventana.close();
    ventana.destroy();
  });

  //ipcMain.once()
}

function abriPantallaPedidos(direccion1, direccion2, codRegreso, cedula) {
  let ventana = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 800,
    show: false,
  });
  ventana.loadFile(direccion1);
  ventana.on("ready-to-show", () => {
    ventana.webContents.send("cedulaConfirm", cedula);
    ventana.show();
  });
  mainWindows.close();
  mainWindows.destroy();
  ipcMain.once(codRegreso, (e, args) => {
    abrirMain(direccion2);
    ventana.close();
    ventana.destroy();
  });
}

function abrirMain(direccion) {
  mainWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 800,
  });
  mainWindows.loadFile(direccion);
  //mainWindows.loadFile("src/ui//templates/main.html");
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

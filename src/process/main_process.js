const { BrowserWindow, ipcMain, app } = require("electron");

let mainWindows;
let pedidosWindow;
let resultadosWindow;
let doctoresWindow;
let establecimientosWindow;
let pacientesWindow;

//falta crear una pantalla por cada icono del menu por ejemplo pantalla pedidos
//como esta el process se confunde

app.on("ready", () => {
  mainWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 800,
  });
  mainWindows.loadFile("src/ui//templates/main.html");

  //---------------OPCION PEDIDOS
  ipcMain.on("envio-datos-paciente", (e, args) => {
    const { recibir } = require("./pedido_process.js");

    pedidosWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 900,
      height: 800,
      show: false,
    });
    pedidosWindow.loadFile("src/ui//templates/pedidos.html");
    //app.allowRendererProcessReuse = false;
    pedidosWindow.show();
    mainWindows.hide();
    app.whenReady().then(recibir);

    ipcMain.once("regresar-pedidos", (e, args) => {
      console.log(args);
      mainWindows.show();
      pedidosWindow.close();
      pedidosWindow.destroy();
    });
  });

  //---------------OPCION RESULTADOS
  ipcMain.on("consulta-datos-paciente", (e, args) => {
    const { consultar } = require("./resultado_process.js");

    resultadosWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 900,
      height: 800,
      show: false,
    });
    resultadosWindow.loadFile("src/ui//templates/resultados.html");
    //app.allowRendererProcessReuse = false;
    resultadosWindow.show();
    mainWindows.hide();
    app.whenReady().then(consultar);

    ipcMain.once("regresar-resultados", (e, args) => {
      console.log(args);
      mainWindows.show();
      resultadosWindow.close();
      resultadosWindow.destroy();
    });
  });

  //---------------OPCION PACIENTES
  ipcMain.on("paciente-consultar", (e, args) => {
    const { pacientes } = require("./pacientes_process.js");

    pacientesWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 900,
      height: 800,
      show: false,
    });
    pacientesWindow.loadFile("src/ui//templates/consultaPedidos.html");
    //app.allowRendererProcessReuse = false;
    pacientesWindow.show();
    mainWindows.hide();
    app.whenReady().then(pacientes);

    ipcMain.once("regresar-pacientes", (e, args) => {
      console.log(args);
      mainWindows.show();
      pacientesWindow.close();
      pacientesWindow.destroy();
    });
  });

  //---------------OPCION DOCTORES
  ipcMain.on("medicos-crear-eliminar", (e, args) => {
    const { doctores } = require("./doctores_process.js");

    doctoresWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 900,
      height: 800,
      show: false,
    });
    doctoresWindow.loadFile("src/ui//templates/doctores.html");
    //app.allowRendererProcessReuse = false;
    doctoresWindow.show();
    mainWindows.hide();
    app.whenReady().then(doctores);

    ipcMain.once("regresar-doctores", (e, args) => {
      console.log(args);
      mainWindows.show();
      doctoresWindow.close();
      doctoresWindow.destroy();
    });
  });

  //---------------OPCION ESTABLECIMIENTOS
  ipcMain.on("establecimientos-crear-eliminar", (e, args) => {
    const { estab } = require("./establecimientos_process.js");

    establecimientosWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 900,
      height: 800,
      show: false,
    });
    establecimientosWindow.loadFile("src/ui//templates/establecimientos.html");
    //app.allowRendererProcessReuse = false;
    establecimientosWindow.show();
    mainWindows.hide();
    app.whenReady().then(estab);

    ipcMain.once("regresar-establecimientos", (e, args) => {
      console.log(args);
      mainWindows.show();
      establecimientosWindow.close();
      establecimientosWindow.destroy();
    });
  });

  //---------------SALIR
  ipcMain.on("exit-app", (e, args) => {
    console.log(args);
    mainWindows.close();
    mainWindows.destroy();
  });
});

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

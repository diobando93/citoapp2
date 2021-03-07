const { BrowserWindow, ipcMain, app } = require("electron");
const { pacientes } = require("./pacientes_process.js");
const Patient = require("../models/patient.js");
const check = {};

bdPaciente = [];
let mainWindows;

function findPatient() {
  console.log("entro");
  ipcMain.on("consulta-paciente", async (e, args) => {
    //console.log(args);
    bdPaciente = await checkPacientes(args);
    e.returnValue = JSON.stringify(bdPaciente);
  });

  //ipcMain.on("pantalla1", (e, args) => {
  //  abrirPantalla(args[0], args[1], args[2]);
  //});

  //ipcMain.on("pantalla2", (e, args) => {
  //  abrirPantalla(args[0], args[1], args[2]);
  //});
}

async function checkPacientes(cedulaFind) {
  let resultados = await Patient.find({ cedula: cedulaFind });
  //console.log(resultados);
  return resultados;
}

function cedulaValue() {
  if (bdPaciente.length > 0) {
    return bdPaciente;
  } else {
    return "no existe paciente";
  }
}

//function abrirPantalla(direccion, codRegreso) {
//  let ventana = new BrowserWindow({
//    webPreferences: {
//      nodeIntegration: true,
//    },
//    width: 900,
//    height: 800,
//    show: false,
//  });
//  ventana.loadFile(direccion);
//  ventana.webContents.send("saludos", "saludos");
//  ventana.show();
//}

module.exports = { findPatient };

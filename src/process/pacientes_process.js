const { ipcMain } = require("electron");
const Patient = require("../models/patient.js");

let ficha = [];

console.log("CARGANDO PACIENTES PROCESS");

function pacientes() {
  ipcMain.on("consulta-pacientes", async (e, args) => {
    ficha = await checkPacientes();
    e.returnValue = JSON.stringify(ficha);
  });
}

async function checkPacientes() {
  let personas = await Patient.find();

  if (personas.length == 0) {
    console.log("no existen pacientes registrados aún");
  }
  return personas;
}

module.exports = { pacientes };

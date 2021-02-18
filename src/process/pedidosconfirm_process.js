const { ipcMain } = require("electron");
const Patient = require("../models/patient.js");

function findPatient() {
  console.log("entro");
}

module.exports = { findPatient };

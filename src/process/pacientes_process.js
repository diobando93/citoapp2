const { ipcMain } = require("electron");
const Establecimiento = require("../models/establecimiento.js");
const Patient = require("../models/patient.js");
const hclinic = require("../models/h_clinic.js");

let ficha = [];

console.log("CARGANDO ESTABLECIMIENTOS PROCESS");

function pacientes() {
  //checkEstablecimientos();
  ipcMain.on("consulta-pacientes", async (e, args) => {
    ficha = await checkPacientes();
    e.returnValue = JSON.stringify(ficha);
    //e.returnValue = JSON.stringify(EST);
  });

  //checkEstablecimientos();
  ipcMain.on("add-establecimientos", async (e, args) => {
    guardarEstablecimiento(args);
  });
}

function guardarEstablecimiento(arg) {
  const establecimiento = new Establecimiento({
    Nombre: arg,
  });

  establecimiento.save((err, document) => {
    if (err) console.log(err);
  });
}

async function checkPacientes() {
  let DBpacientesNombres = [];
  let DBpacientesApellido = [];

  let personas = await Patient.find();

  if (personas.length == 0) {
    console.log("no existen pacientes registrados aún");
  }
  console.log(personas);
  /* 
  else {
    for (var key in personas) {
      if (personas[key].get("nombres") != "") {
        DBpacientesNombres.push(personas[key].get("nombres"));
      }
      if (personas[key].get("apellidos") != "") {
        DBpacientesApellido.push(personas[key].get("apellidos"));
      }
    }
    console.log(DBpacientesNombres);
    console.log(DBpacientesApellido);
  }
  */
  return personas;
  /*
  let arrInstituciones = [];
  instituciones = await Establecimiento.find();

  for (var key in instituciones) {
    //console.log(instituciones[key].get('Nombre'));
    DBestablecimientos.push(instituciones[key].get("Nombre"));
  }

  //console.log(DBestablecimientos);
  return DBestablecimientos;
  */
}

function consultar() {}

function cancelar() {}

module.exports = { pacientes };

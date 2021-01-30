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
    //alert("No existen pacientes registrados");

    console.log("no existen pacientes registrados aún");
  }
  //console.log(personas);
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

module.exports = { pacientes };

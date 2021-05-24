const electron = require("electron");
const { ipcRenderer } = electron;
const cedula = document.getElementById("cedula");
const validaciones = require("../scripts/validaciones.js");

function buscar() {
  //console.log("entro");
  envia = true;
  envia = validaciones.verificarDiez(cedula.value);
  console.log(envia);
  if (envia == true) {
    let pacientesDB = [];
    pacientesDB = JSON.parse(
      ipcRenderer.sendSync("consulta-paciente", cedula.value)
    );
    if (pacientesDB.length == 0) {
      ipcRenderer.send("regresar-pedidos", "regresar-pedidos");
      //console.log("abrir con inputs");
      ipcRenderer.send("pantalla2", [
        "src/ui//templates/Pedidos2.html",
        "src/ui//templates/main.html",
        "regresar-pedidos",
        cedula.value,
      ]);
    } else {
      ipcRenderer.send("regresar-pedidos", "regresar-pedidos");
      //console.log("abrir labels");
      ipcRenderer.send("pantalla1", [
        "src/ui//templates/pedidos.html",
        "src/ui//templates/main.html",
        "regresar-pedidos",
        pacientesDB[0].cedula,
      ]);
    }
  } else {
    console.log("ingrese un numero de cedula correcto");
    alert("Ingrese un numero de cedula correcto");
  }

  /*
 
  console.log(pacientesDB);
  */
}

function regresar() {
  ipcRenderer.send("regresar-pedidos", "regresar-pedidos");
}

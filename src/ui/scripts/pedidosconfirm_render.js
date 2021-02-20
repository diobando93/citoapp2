const electron = require("electron");
const { ipcRenderer } = electron;
const cedula = document.getElementById("cedula");

function buscar() {
  console.log("entro");
  let pacientesDB = [];
  pacientesDB = JSON.parse(
    ipcRenderer.sendSync("consulta-paciente", cedula.value)
  );

  if (pacientesDB.length == 0) {
    console.log("abrir con inputs");
    ipcRenderer.send("pantalla2", [
      "src/ui//templates/Pedidos2.html",
      "regresar-pedidos",
    ]);
  } else {
    console.log("abrir labels");
    ipcRenderer.send("pantalla1", [
      "src/ui//templates/pedidos.html",
      "regresar-pedidos",
    ]);
  }
  console.log(pacientesDB);
}
function regresar() {
  ipcRenderer.send("regresar-pedidos", "regresar-pedidos");
}

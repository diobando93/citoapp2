const electron = require("electron");
const { ipcRenderer } = electron;
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
//var dropdown = document.getElementsByClassName("dropdown-btn");

var i;

let pedido = false;
let resultado = false;
let retiro = false;

for (i = 0; i < dropdown.length - 1; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;

    if (dropdownContent.style.display === "block") {
      console.log("esto1");
      dropdownContent.style.display = "none";
    } else {
      console.log("esto2");
      dropdownContent.style.display = "block";
    }
  });
}

//Listener de boton PEDIDOS
document.getElementById("pedidos").addEventListener("click", function (e) {
  pedido = true;
  ipcRenderer.send("envio-datos-paciente", [
    "src/ui//templates/pedidosconfirm.html",
    "src/ui//templates/main.html",
    "regresar-pedidos",
  ]);
});

//Listener de boton RESULTADOS
document.getElementById("resultados").addEventListener("click", function (e) {
  resultado = true;
  ipcRenderer.send("consulta-datos-paciente", [
    "src/ui//templates/resultados.html",
    "src/ui//templates/main.html",
    "regresar-resultados",
  ]);
});

//Listener de boton de retiro de informes

document.getElementById("informes").addEventListener("click", function (e) {
  resultado = true;
  ipcRenderer.send("informes-consultar", [
    "src/ui//templates/consultaInformes.html",
    "src/ui//templates/main.html",
    "regresar-informes",
  ]);
});

//consulta de pedidos

document
  .getElementById("ConsultaPedidos")
  .addEventListener("click", function (e) {
    resultado = true;
    ipcRenderer.send("consulta-pedidos", [
      "src/ui//templates/consultaPedidos.html",
      "src/ui//templates/main.html",
      "regresar-consultaPedidos",
    ]);
  });

//Listener de botones CONSULTA DE PACIENTES
document.getElementById("pacientes").addEventListener("click", function (e) {
  resultado = true;
  ipcRenderer.send("paciente-consultar", [
    "src/ui//templates/consultaPacientes.html",
    "src/ui//templates/main.html",
    "regresar-pacientes",
  ]);
});

//Listener de boton DOCTORES
document.getElementById("doctores").addEventListener("click", function (e) {
  resultado = true;
  ipcRenderer.send("medicos-crear-eliminar", [
    "src/ui//templates/doctores.html",
    "src/ui//templates/main.html",
    "regresar-doctores",
  ]);
});

//Listener de boton ESTABLECIMIENTOS
document
  .getElementById("establecimientos")
  .addEventListener("click", function (e) {
    resultado = true;
    ipcRenderer.send("establecimientos-crear-eliminar", [
      "src/ui//templates/establecimientos.html",
      "src/ui//templates/main.html",
      "regresar-establecimientos",
    ]);
  });

//Listener de boton SALIR
document.getElementById("salir").addEventListener("click", function (e) {
  console.log("saliendo");
  ipcRenderer.send("exit-app", resultado);
});

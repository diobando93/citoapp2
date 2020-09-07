const electron = require('electron')
const {ipcRenderer} = electron
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
//var dropdown = document.getElementsByClassName("dropdown-btn");

var i;

let pedido = false;
let resultado = false;
let retiro = false;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
     this.classList.toggle("active");
     var dropdownContent = this.nextElementSibling;
     if (dropdownContent.style.display === "block") {
         dropdownContent.style.display = "none";
     } else {
         dropdownContent.style.display = "block";
     }
 });
}


document.getElementById('pedidos').addEventListener('click', function(e){
    pedido = true;
    ipcRenderer.send('envio-datos-paciente', pedido);
});

document.getElementById('resultados').addEventListener('click', function(e) {
    resultado = true;
    ipcRenderer.send('consulta-datos-paciente', resultado);
});

document.getElementById('doctores').addEventListener('click', function(e) {
    resultado = true;
    ipcRenderer.send('medicos-crear-eliminar', resultado);
});

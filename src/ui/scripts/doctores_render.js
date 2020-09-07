const electron = require('electron');
const {ipcRenderer} = electron;
const nombres = document.getElementById("Nombre");
const apellidos = document.getElementById("Apellido");
const establecimiento =document.getElementById("establecimiento");
let datos = [];

function medicos_render (){
    datos.push(nombres.value);
    datos.push(apellidos.value);
    datos.push(establecimiento.value);
    console.log(datos)
    ipcRenderer.send('datos', datos);
    datos = [];
}

const electron = require('electron');
const { ipcRenderer } = electron;
const nombres = document.getElementById("Nombre");
const apellidos = document.getElementById("Apellido");
let establecimiento = document.getElementById("establecimiento");
let datos = [];

let table = document.getElementById("myTable");

function buscarDoctores() {



}

function limpiar_tabla(listaDoctores) {

    for (var del in listaDoctores) {

        document.getElementById("myTable").deleteRow(0);
    }

}

function medicos_render() {
    datos.push(nombres.value);
    datos.push(apellidos.value);
    datos.push(establecimiento.value);
    console.log(datos)
    ipcRenderer.send('datos', datos);
    datos = [];
}

function actualizar_establecimientos() {

    let lista = establecimientos_render();

    //Colocar establecimientos en drop down
    var dropBox = document.getElementById("establecimiento");
    for (var key in lista) {
        dropBox.options.add(
            new Option(key.toString() + " - " + lista[key].toString())
        );
    }

}

function getDoctores() {

    var institucion = establecimiento.value;
    institucion = institucion.substring(institucion.indexOf("-") + 2);

    let doctoresDB = [];

    doctoresDB = JSON.parse(ipcRenderer.sendSync('consulta-doctores', institucion));
    //console.log(doctoresDB);

    console.log(table.rows.length)

    if (table.rows.length != 1) {
        //Limpiar tabla de doctores
        limpiar_tabla(doctoresDB);
    }
    
    //Actualizar tabla de doctores
    actualizar_tabla(doctoresDB);

}

function establecimientos_render() {

    document.getElementById("botonesBusqueda").style.display = "none";

    //Recibir arreglo de establecimientos
    let establecimientosDB = [];

    establecimientosDB = JSON.parse(ipcRenderer.sendSync("consulta-establecimientos", "consulta-establecimientos"));
    console.log(establecimientosDB);

    return establecimientosDB;

}

function exitDoctores() {

    ipcRenderer.send("regresar-doctores", "regresar-doctores");

}

function actualizar_tabla(listaDoctores) {

    for (var i in listaDoctores) {

        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = i;
        cell2.innerHTML = listaDoctores[i];
    }

}


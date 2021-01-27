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

    for (i = 0; i < listaDoctores - 1; i++) {

        document.getElementById("myTable").deleteRow(1);
    }

}

function medicos_render() {
    datos.push(nombres.value);
    datos.push(apellidos.value);
    var institucion = establecimiento.value;
    institucion = institucion.substring(institucion.indexOf("-") + 2);
    datos.push(institucion);
    console.log(datos)
    ipcRenderer.send('datos', datos);
    datos = [];

    location.reload();
}

function actualizar_establecimientos() {

    let lista = establecimientos_render();

    //Colocar establecimientos en drop down
    var dropBox = document.getElementById("establecimiento");

    dropBox.options.add(new Option(" "));

    for (var key in lista) {
        dropBox.options.add(
            new Option(key.toString() + " - " + lista[key].toString())
        );
    }

}

function getDoctores() {

    //Limpiar tabla de doctores
    limpiar_tabla(table.rows.length);

    var institucion = establecimiento.value;
    institucion = institucion.substring(institucion.indexOf("-") + 2);
    //console.log(institucion);

    let doctoresDB = [];

    doctoresDB = JSON.parse(ipcRenderer.sendSync('consulta-doctores', institucion));
    console.log(doctoresDB);

    //console.log(table.rows.length)

    //Limpiar tabla de doctores
    //limpiar_tabla(doctoresDB);

    //if (table.rows.length != 1) {
        //Limpiar tabla de doctores
    //    limpiar_tabla(doctoresDB);
    //}
    
    //Actualizar tabla de doctores
    actualizar_tabla(doctoresDB);

}

function establecimientos_render() {

    document.getElementById("botonesBusqueda").style.display = "none";

    //Recibir arreglo de establecimientos
    let establecimientosDB = [];

    establecimientosDB = JSON.parse(ipcRenderer.sendSync("consulta-establecimientos-d", "consulta-establecimientos-d"));
    console.log(establecimientosDB);

    return establecimientosDB;

}

function exitDoctores() {

    ipcRenderer.send("regresar-doctores", "regresar-doctores");

}

function actualizar_tabla(listaDoctores) {

    for (var i in listaDoctores) {

        var row = table.insertRow();
        row.classList.add("w3-hover-table")
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = parseInt(i) + 1;
        cell2.innerHTML = listaDoctores[i];
    }

}


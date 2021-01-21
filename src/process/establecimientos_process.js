const { ipcMain } = require('electron');
const Establecimiento = require('../models/establecimiento.js');
const Patient = require("../models/patient.js");
const hclinic = require("../models/h_clinic.js");

let EST = [];

console.log("CARGANDO ESTABLECIMIENTOS PROCESS")

function estab() {

    //checkEstablecimientos();
    ipcMain.on("consulta-establecimientos", async (e, args) => {

        EST = await checkEstablecimientos();
        e.returnValue = JSON.stringify(EST);

    });

    //checkEstablecimientos();
    ipcMain.on("add-establecimientos", async (e, args) => {
        guardarEstablecimiento(args);
    });

}

function guardarEstablecimiento(arg) {

    const establecimiento = new Establecimiento({
        Nombre: arg
    })

    establecimiento.save((err, document) => {
        if (err) console.log(err);
    });

}

async function checkEstablecimientos() {

    let DBestablecimientos = [];
    let instituciones = await Establecimiento.find();
    //console.log(instituciones);

    if (instituciones.length == 0) {

        const listaInicial = ["Interno", "Zurita", "Medicamental"];

        for (i = 0; i < listaInicial.length; i++) {

            guardarEstablecimiento(listaInicial[i]);

        }
    } else {

    }

    let arrInstituciones = [];
    instituciones = await Establecimiento.find();


    for (var key in instituciones) {
        //console.log(instituciones[key].get('Nombre'));
        DBestablecimientos.push(instituciones[key].get('Nombre'));
    }

    //console.log(DBestablecimientos);
    return DBestablecimientos;
}

function consultar() { }

function cancelar() { }

module.exports = { estab };
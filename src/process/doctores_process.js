const { ipcMain } = require('electron');
const Establecimiento = require('../models/establecimiento.js');
const Medicos = require('../models/medicos.js');

let EST = [];

console.log("CARGANDO DOCTORES PROCESS")

function doctores() {

    ipcMain.on("consulta-establecimientos-d", async (e, args) => {

        EST = await checkEstablecimientos();
        e.returnValue = JSON.stringify(EST);

    });

    ipcMain.on('datos', async (e, args) => {
        console.log(args);
        const doctor = {
            nombre: args[0],
            apellido: args[1],
            institucion: args[2]
        }
        const newMedico = new Medicos(doctor);
        const MedicoSaved = await newMedico.save();
    });


    ipcMain.on("consulta-doctores", async (e, args) => {

        console.log(args)
        medicos = [];

        medicos_buscar = await Medicos.find({ institucion: args });

        //console.log(medicos_buscar);

        for (var key in medicos_buscar) {
            let nombreCompleto =
                medicos_buscar[key].nombre + " " + medicos_buscar[key].apellido;
            medicos.push(nombreCompleto);
        }

        //console.log(medicos);
        e.returnValue = JSON.stringify(medicos);

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


module.exports = {doctores};

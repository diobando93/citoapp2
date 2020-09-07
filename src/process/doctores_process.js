const {ipcMain} = require('electron');
const Medicos = require('../models/medicos.js');
function doctores (){
    ipcMain.on('datos', async(e, args) =>{
        console.log(args);
        const doctor = {
            nombre: args[0],
            apellido: args[1],
            institucion: args[2]
        }
        const newMedico =  new Medicos(doctor);
        const MedicoSaved = await newMedico.save();
    })
}

module.exports = {doctores};

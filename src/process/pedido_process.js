const {ipcMain} = require('electron');
const Patient = require('../models/patient.js');
const Antecedent = require('../models/antecedent.js');
const validaciones = require('./validaciones.js');

//recibe datos desde el pedido_render
function recibir(){
    ipcMain.on('datos', async (e, args) =>{
        let envia0 = true;
        let envia1 = true;
        let datosVacios = [args[0], args[1], args[2], args[3], args[4]];
        let datosNumeros = [args[0], args[4]];
        //envia0 = validaciones.verificarVacio(datosVacios);
        //envia1 = validaciones.verificarNumero(datosNumeros);
        const paciente = {
            h_clinica: args[1],
            cedula: args[0],
            apellidos: args[3],
            nombres: args[2],
            f_nacimiento: args[5]
        }
        const antecedente = {
            h_clinica: args[1],
            cedula: args[0]
        }
        if (envia0 == true && envia1=== true){
            console.log('formulario correcto');
            const newPatient =  new Patient(paciente)
            const patientSaved = await newPatient.save();
            const newAntecedent = new Antecedent(antecedente)
            const antecedentSaved = await newAntecedent.save();
            console.log(patientSaved);
            console.log(antecedentSaved);
        }else{
            console.log('formulario incorrecto');
        };
    });
}
module.exports = {recibir};

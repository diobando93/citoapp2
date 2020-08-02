const {ipcMain} = require('electron');
const Patient = require('../models/patient.js');
const Antecedent = require('../models/antecedent.js');
const Hclinic = require('../models/h_clinic.js');
const validaciones = require('./validaciones.js');
let ecuador = require('ecuador-postal-codes');
let hclicia_acttualizar = 0;
let provincias = [];
//recibe datos desde el pedido_render
function recibir(){
    ipcMain.on('cedula', async(e, args) =>{
        console.log(args);
        hcgen(args);
        provincias = provinces();
        console.log(provincias);
        canton('PICHINCHA');
        parroquia('QUITO');
    });
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
        const hclinica ={
            h_clinica: args[1]
        }
        if (envia0 == true && envia1=== true){
            console.log('formulario correcto');
            const newPatient =  new Patient(paciente);
            const patientSaved = await newPatient.save();
            const newAntecedent = new Antecedent(antecedente);
            const antecedentSaved = await newAntecedent.save();
            const newHclinica = new Hclinic(hclinica);
            const hclinicaSaved = await newHclinica.save();
            console.log(patientSaved);
            console.log(antecedentSaved);
            console.log(hclinicaSaved);
        }else{
            console.log('formulario incorrecto');
        };
    });
}

async function hcgen(cedula){
    let cedula_buscar =  await Patient.find({cedula: cedula}, 'h_clinica').exec();
    let vereificar = false;
    console.log(cedula_buscar);
    console.log(typeof(cedula_buscar));
    vereificar = isEmpty(cedula_buscar);
    if (vereificar == true){
        console.log('genere codigo');
        let hclinicaNew = await Hclinic.find({});
        hclinicaNew = hclinicaNew[0];
        let hclinicaNew1 = parseInt(hclinicaNew.h_clinica);
        hclinicaNew1 = hclinicaNew1 + 2;
        console.log(hclinicaNew1);
        let actualizar = Hclinic.where({_id: '5f1311fef9417d3136858ce8'});
        actualizar.updateOne({$set: {h_clinica: hclinicaNew1}}).exec();
        //return hclinicaNew1;
    } else{
        console.log('envie codigo');
        cedula_buscar = cedula_buscar[0];
        console.log(cedula_buscar.h_clinica);
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
    function provinces(){
        let results = ecuador.data.provinces;
        let provincias = [];
        for (var key in results){
            provincias.push(results[key].name);
        }
        return provincias;
    }

    function canton(args){
        let results =  ecuador.data.lookupProvinces(args);
        results = results[0];
        let canton = [];
        for (var key in results.cities){
            canton.push(results.cities[key].name);
        }
        console.log(canton);
        //console.log(results.cities[0].towns);
    }

    function parroquia(args){
        let result = ecuador.data.lookupCities(args);
        results = result[0];
        let parroquia = [];
        for (var key in results.towns){
            parroquia.push(results.towns[key].name);
        }
        console.log(parroquia);
        //console.log(result);
    }



module.exports = {recibir};

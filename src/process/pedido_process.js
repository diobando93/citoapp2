const {ipcMain} = require('electron');
const Patient = require('../models/patient.js');
const Pedido = require('../models/pedido.js');
const Hclinic = require('../models/h_clinic.js');
const Pedidocounter = require('../models/pedidocounter.js');
const validaciones = require('./validaciones.js');
let ecuador = require('ecuador-postal-codes');
let provincias = [];
let cantones = [];
let parroquias = [];
let numPedido = '';
let hClinica = '';
//recibe datos desde el pedido_render
function recibir(){
    ipcMain.on('cedula', async(e, args) =>{
        console.log(args);
        const hcl = hcgen(args);
        hcl.then(hClinica => {
            console.log(hClinica);
            hClinica = JSON.stringify(hClinica);
            e.reply('hClinica', hClinica);
        });
        //hcgen(args);
        const ped = pedidogen();
        ped.then(numPedido => {
            console.log(numPedido);
            numPedido = JSON.stringify(numPedido);
            e.reply('numPedido', numPedido);
        });
        //numPedido = JSON.stringify(numPedido);
        //console.log(numPedido)
        provincias = provinces();
        e.returnValue = JSON.stringify(provincias);
        ipcMain.on('dropProvincia', async (e, args) =>{
            cantones = canton(args);
            e.returnValue = JSON.stringify(cantones);
            cantones = [];
        });
        ipcMain.on('dropCanton', async(e, args) =>{
            parroquias = parroquia(args);
            e.returnValue = JSON.stringify(parroquias);
        });
    });

    ipcMain.on('datos', async (e, args) =>{
        console.log('formulario correcto');
        let envia0 = true;
        let envia1 = true;
        let datosVacios = [args[0], args[1], args[2], args[3], args[4]];
        let datosNumeros = [args[0], args[4]];
        let genHc = args[1];
        let array = [];
        let array2 = [];
        array = genHc.split('-');
        array2 = array[0].split('"');
        console.log(array2[1]);
        //envia0 = validaciones.verificarVacio(datosVacios);
        //envia1 = validaciones.verificarNumero(datosNumeros);

        if (envia0 == true && envia1=== true){
            if (array[1] == 'actualice"'){
                const NewhC = {
                    h_clinica: array2[1]
                }
                let actualizar = Hclinic.where({_id: '5f1311fef9417d3136858ce8'});
                actualizar.updateOne({$set: {h_clinica: array2[1]}}).exec();
            }
            const pedidogenCounter = {
                pedido_counter: args[35]
            }
            //const historiaClinica = {

            //}
            const paciente = {
                h_clinica: args[1],
                cedula: args[0],
                apellidos: args[4],
                nombres: args[3],
                f_nacimiento: args[6],
            }
            const pedidoBD = {
                h_clinica: args[1],
                cedula: args[0],
                pedido: args[35],
                edad: args[5],
                establecimiento: args[2],
                ubicacion: {
                    pais: args[7],
                    provincia: args[8],
                    canton: args[9],
                    parroquia: args[10],
                    sector: args[11],
                },
                estudios: {
                    instruccion: args[12],
                    ocupacion: args[13],
                    ins_jefefamilia: args[14],
                    ocu_jefefamilia: args[15],
                },
                f_muestra: args[16],
                fecha_ult_mestruacion: args[17],
                metodo_planificacion: args[18],
                num_partos: args[19],
                num_abortos: args[20],
                inicio_sexo: args[21],
                embarazada: args[22],
                lactancia: args[23],
                destruccion_local: args[24],
                conizacon: args[25],
                histectomia: args[26],
                radioterapia: args[27],
                hormonoterapia: args[28],
                otros: args[29],
                citologia: {
                    Si: args[30],
                    No: args[31],
                    numero: args[32],
                    anios: args[33],
                    meses: args[34]
                }
            }

            //const newPatient =  new Patient(paciente);
            //const patientSaved = await newPatient.save();
            //const newPedido = new Pedido(pedidoBD);
            //const pedidoSaved = await newPedido.save();
            //const newnumPedido=  new Pedidocounter(numPedido);
            //const pedidotSaved = await newPedido.save();
            //const newHclinica = new Hclinic(hclinica);
            //const hclinicaSaved = await newHclinica.save();
            //console.log(patientSaved);
            //console.log(pedidoSaved);
            //console.log(hclinicaSaved);
        }else{
            console.log('formulario incorrecto');
        };
    });
}

async function pedidogen(){
    let pedido_buscar =  await Pedidocounter.find({});
    let fecha = new Date().toISOString().slice(0, 10);
    let verificar = false;
    verificar = isEmpty(pedido_buscar);
    if (verificar == true){
        let numero = fecha.split('-');
        numero.push('1');
        numero = numero.join('-');
        return numero;
    }else{
        let counter = pedido_buscar[0];
        let counter1 = counter.pedido_counter;
        counter1 = counter1.split('-');
        let counter2 = parseInt(counter1[3])+1;
        counter2 = counter2.toString();
        let numero = fecha.split('-');
        numero.push(counter2);
        numero = numero.join('-');
        return numero;
        //console.log(pedido_counter);
    }

}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
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
    return canton;
}

function parroquia(args){
    let result = ecuador.data.lookupCities(args);
    results = result[0];
    let parroquia = [];
    for (var key in results.towns){
        parroquia.push(results.towns[key].name);
    }
    return parroquia;
}

async function hcgen(cedula){
    let cedula_buscar =  await Patient.find({cedula: cedula}, 'h_clinica').exec();
    let vereificar = false;
    console.log(cedula_buscar);
    //console.log(typeof(cedula_buscar));
    vereificar = isEmpty(cedula_buscar);
    if (vereificar == true){
        console.log('genere codigo');
        let hclinicaNew = await Hclinic.find({});
        hclinicaNew = hclinicaNew[0];
        let hclinicaNew1 = parseInt(hclinicaNew.h_clinica);
        hclinicaNew1 = hclinicaNew1 + 2;
        hclinicaNew1 = hclinicaNew1.toString();
        hclinicaNew1 = hclinicaNew1.concat('-actualice');
        return hclinicaNew1;
        //let actualizar = Hclinic.where({_id: '5f1311fef9417d3136858ce8'});
        //actualizar.updateOne({$set: {h_clinica: hclinicaNew1}}).exec();
        //return hclinicaNew1;
    } else{
        console.log('envie codigo');
        cedula_buscar = cedula_buscar[0];
        let hclinicaNew2 = cedula_buscar.h_clinica;
        return hclinicaNew2;
        //console.log(cedula_buscar.h_clinica);
    }

}

module.exports = {recibir};

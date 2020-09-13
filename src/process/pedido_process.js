const {ipcMain} = require('electron');
const Patient = require('../models/patient.js');
const Pedido = require('../models/pedido.js');
const Hclinic = require('../models/h_clinic.js');
const Pedidocounter = require('../models/pedidocounter.js');
const Medicos = require('../models/medicos.js');
const validaciones = require('./validaciones.js');
let ecuador = require('ecuador-postal-codes');
let provincias = [];
let cantones = [];
let parroquias = [];
let numPedido = '';
let hClinica = '';
monentoActual = new Date;
hora = monentoActual.getHours();
minuto = monentoActual.getMinutes();
segundo = monentoActual.getSeconds();
hora = hora + " : " + minuto + " : " + segundo;
//recibe datos desde el pedido_render
function recibir(){
    console.log(hora);
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

    ipcMain.on('dropMedicos', async (e, args) =>{
        console.log(args);
        medicos = []
        let medicos_buscar =  await Medicos.find({institucion: args}, 'nombre apellido').exec();
        for (var key in medicos_buscar ) {
            let nombreCompleto = medicos_buscar[key].nombre
            nombreCompleto = nombreCompleto.concat(' ').concat(medicos_buscar[key].apellido)
            //console.log(nombreCompleto);
            medicos.push(nombreCompleto);
        }
        e.returnValue =JSON.stringify(medicos);
        //console.log(medicos_buscar);
        console.log(medicos);
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
                let actualizar = Hclinic.where({_id: '5f1311fef9417d3136858ce8'});
                actualizar.updateOne({$set: {h_clinica: array2[1]}}).exec();
                hClinica = array2[1];
            } else{
                hClinica = args[1]
            }
            //const pedidogenCounter = {
            //    pedido_counter: args[39]
            //}
            //const historiaClinica = {

            //}

            const paciente = {
                fecha: new Date().toISOString().slice(0, 10),
                hora: hora,
                h_clinica: hClinica,
                cedula: args[0],
                apellidos: args[4],
                nombres: args[3],
                f_nacimiento: args[6],
            }
            const pedidoBD = {
                fecha: new Date().toISOString().slice(0, 10),
                hora: hora,
                h_clinica: hClinica,
                cedula: args[0],
                pedido: args[39],
                edad: args[5],
                establecimiento: args[2],
                telefonof: args[16],
                email: args[17],
                telefonof: args[18],
                emailf: args[19],
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
                f_muestra: args[20],
                fecha_ult_mestruacion: args[21],
                metodo_planificacion: args[22],
                num_partos: args[23],
                num_abortos: args[24],
                inicio_sexo: args[25],
                embarazada: args[26],
                lactancia: args[27],
                destruccion_local: args[28],
                conizacon: args[29],
                histectomia: args[30],
                radioterapia: args[31],
                hormonoterapia: args[32],
                otros: args[33],
                citologia: {
                    Si: args[34],
                    No: args[35],
                    numero: args[36],
                    anios: args[37],
                    meses: args[38]
                }
            }
            let pacienteBuscar = await Patient.find({cedula: args[0]}).exec();
            console.log(pacienteBuscar);
            let verificar = true;
            verificar = isEmpty(pacienteBuscar);
            console.log(verificar);
            if (verificar == true){
                const newPatient =  new Patient(paciente);
                const patientSaved = await newPatient.save();
                console.log('paciente nuevo');
            }else {
                console.log('paciente ya existe')
            }
            const newPedido = new Pedido(pedidoBD);
            const pedidoSaved = await newPedido.save();
            //const newPC = new Pedidocounter(pedidogenCounter);
            //const PCSaved = await newPC.save();
            let actualizarPC = Pedidocounter.where({_id: '5f5802815a5736164e9858a0'});
            actualizarPC.updateOne({$set: {pedido_counter: args[39]}}).exec();
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
        fechacompro = '"' +  fecha;
        console.log(pedido_buscar);
        console.log(fechacompro);
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

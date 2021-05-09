const { ipcMain } = require("electron");
const Patient = require("../models/patient.js");
const Pedido = require("../models/pedido.js");
const Hclinic = require("../models/h_clinic.js");
const Pedidocounter = require("../models/pedidocounter.js");
const Medicos = require("../models/medicos.js");
const validaciones = require("./validaciones.js");
let ecuador = require("ecuador-postal-codes");
let provincias = [];
let cantones = [];
let parroquias = [];
let numPedido = "";
let hClinica = "";

console.log("CARGANDO PEDIDO PROCESS");
//let medicosBD = "";
//recibe datos desde el pedido_render

//bug3: validar el formulario

function recibir() {
  //bug0: MAL HACER UNA FUNCION DEL TIEMPOconsole.log(hora);
  //bug0: resuelto
  console.log(hourNow());
  /*
    ipcMain.on("exit-pedidos", (e, args) => {
        console.log(args);
        ipcMain.removeListener("cedula", async (e, args) => {

        });

    });
    */

  //Funcion para recibir el numero de cedula del textbox
  ipcMain.on("cedula", async (e, args) => {
    console.log(args + " numero de cedula ingresado"); // Imprime por consolo el numero de cedula

    const hcl = hcgen(args); // Llamado a la funcion para generar o responder con un numero de historia clinica
    hcl.then((hClinica) => {
      console.log(hClinica + " historia clinica"); // Imprime la historia clinica
      hClinica = JSON.stringify(hClinica);
      e.reply("hClinica", hClinica);
    });

    const ped = pedidogen(); // llamado a la funcion para generar un numero de pedido bug cuando cambie de fecha reiniciar el numero del contador
    ped.then((numPedido) => {
      console.log(numPedido + " numero de pedido"); // imprime el numero del pedido
      numPedido = JSON.stringify(numPedido);
      e.reply("numPedido", numPedido);
    });

    provincias = provinces(); // funcion para consultar las provincias de Ecuador
    e.returnValue = JSON.stringify(provincias);
  });

  //consulta de cantones
  ipcMain.on("dropProvincia", async (e, args) => {
    cantones = canton(args);
    e.returnValue = JSON.stringify(cantones);
    cantones = [];
  });

  //Consuta de parroquias
  ipcMain.on("dropCanton", async (e, args) => {
    parroquias = parroquia(args);
    e.returnValue = JSON.stringify(parroquias);
  });

  //funcion para consultar los nombres de los doctors dependiendo del establecimiento
  ipcMain.on("dropMedicos", async (e, args) => {
    console.log(args);
    medicos = [];
    let medicos_buscar = await Medicos.find(
      { institucion: args },
      "nombre apellido"
    ).exec();
    for (var key in medicos_buscar) {
      let nombreCompleto =
        medicos_buscar[key].nombre + " " + medicos_buscar[key].apellido;
      medicos.push(nombreCompleto);
    }
    e.returnValue = JSON.stringify(medicos);
  });

  //funcion para validar los datos del formulario y ademas guardar en la bd de paciente y pedidos
  ipcMain.on("datos", async (e, args) => {
    let envia0 = true;
    let envia1 = true;
    let datosVacios = [args[0], args[1], args[2], args[3], args[4]];
    let datosNumeros = [args[0], args[4]];
    let genHc = args[1];
    let array = [];
    let array2 = [];
    array = genHc.split("-");
    array2 = array[0].split('"');

    //console.log(array2[1].replace(/['"]+/g, ""));
    //envia0 = validaciones.verificarVacio(datosVacios);
    //envia1 = validaciones.verificarNumero(datosNumeros);

    // bug2: popup para preguntar si continuar en la pantalla de pedidos, entonces se debe resetear los campos
    // si no se desea continuar regresar al main menu
    if (envia0 == true && envia1 === true) {
      console.log("formulario correcto");
      if (array[1] == 'actualice"') {
        let actualizar = Hclinic.where({ _id: "5fcd4685b3b8b747e6347f82" });
        actualizar.updateOne({ $set: { h_clinica: array2[1] } }).exec();
        hClinica = array2[1];
        console.log(hClinica);
      } else {
        hClinica = args[1];
        console.log(hClinica);
      }

      const paciente = {
        fecha: new Date().toISOString().slice(0, 10),
        hora: hourNow(),
        h_clinica: hClinica,
        cedula: args[0],
        apellidos: args[4],
        nombres: args[3],
        f_nacimiento: args[6],
      };

      const pedidoBD = {
        fecha: new Date().toISOString().slice(0, 10),
        hora: hourNow(),
        h_clinica: hClinica,
        cedula: args[0],
        pedido: args[39].replace(/['"]+/g, ""),
        nombre: args[3],
        apellido: args[4],
        edad: args[5],
        medico: args[40],
        establecimiento: args[2],
        telefono: args[16],
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
        num_cesareas: args[41],
        num_abortos: args[24],
        inicio_sexo: args[25],

        embarazada: args[26],
        lactancia: args[27],
        now_ninguno: args[42],

        destruccion_local: args[28],
        conizacon: args[29],
        histectomia: args[30],
        radioterapia: args[31],
        hormonoterapia: args[32],
        otros: args[33],
        some_ninguno: args[43],

        citologia: {
          Si: args[34],
          No: args[35],
          numero: args[36],
          anios: args[37],
          meses: args[38],
        },
      };
      let pacienteBuscar = await Patient.find({ cedula: args[0] }).exec();
      console.log(pacienteBuscar);
      let verificar = true;
      verificar = isEmpty(pacienteBuscar);
      console.log(verificar);
      if (verificar == true) {
        const newPatient = new Patient(paciente);
        const patientSaved = await newPatient.save();
        console.log("paciente nuevo");
      } else {
        console.log("paciente ya existe");
      }
      const newPedido = new Pedido(pedidoBD);
      const pedidoSaved = await newPedido.save();
      //const newPC = new Pedidocounter(pedidogenCounter);
      //const PCSaved = await newPC.save();
      let actualizarPC = Pedidocounter.where({
        _id: "5f5802815a5736164e9858a0",
      });
      actualizarPC
        .updateOne({ $set: { pedido_counter: args[39].replace(/['"]+/g, "") } })
        .exec();
      //const pedidotSaved = await newPedido.save();
      //const newHclinica = new Hclinic(hclinica);
      //const hclinicaSaved = await newHclinica.save();
      //console.log(patientSaved);
      //console.log(pedidoSaved);
      //console.log(hclinicaSaved);
    } else {
      console.log("formulario incorrecto");
    }
  });
}

// funcion para consultar las provincias
function provinces() {
  let results = ecuador.data.provinces;
  let provincias = [];
  for (var key in results) {
    provincias.push(results[key].name);
  }
  return provincias;
}

//funcion para consulta de cantones
function canton(args) {
  let results = ecuador.data.lookupProvinces(args);
  results = results[0];
  let canton = [];
  for (var key in results.cities) {
    canton.push(results.cities[key].name);
  }
  return canton;
}

//funcion para consulta de parroquias
function parroquia(args) {
  let result = ecuador.data.lookupCities(args);
  results = result[0];
  let parroquia = [];
  for (var key in results.towns) {
    parroquia.push(results.towns[key].name);
  }
  return parroquia;
}

// funcion para consulta o generacion de historias clinicas
async function hcgen(cedula) {
  let cedula_buscar = await Patient.find({ cedula: cedula }).exec();
  let vereificar = false;
  vereificar = isEmpty(cedula_buscar);
  if (vereificar == true) {
    console.log("genere codigo de historia clinica");
    let hclinicaNew = await Hclinic.find({});
    hclinicaNew = hclinicaNew[0];
    let hclinicaNew1 = parseInt(hclinicaNew.h_clinica);
    hclinicaNew1 = hclinicaNew1 + 1;
    hclinicaNew1 = hclinicaNew1.toString();
    hclinicaNew1 = hclinicaNew1.concat("-actualice");
    return hclinicaNew1;
  } else {
    console.log("envie codigo de historia clinica");
    //cedula_buscar = cedula_buscar[0];
    return cedula_buscar;
    /*
    let hclinicaNew2 =
      cedula_buscar.h_clinica +
      " " +
      cedula_buscar.nombres +
      " " +
      cedula_buscar.apellidos;

    return hclinicaNew2;
    */
  }
}

//funcion para generacion de numeros de pedidos
// bug1: falta agregar el reinicio de contador de acuerdo a la de fecha
// bug1: listo
async function pedidogen() {
  let pedido_buscar = await Pedidocounter.find({});
  let fecha = new Date().toISOString().slice(0, 10);
  let verificar = false;
  verificar = isEmpty(pedido_buscar);
  if (verificar == true) {
    let numero = fecha.split("-");
    numero.push("1");
    numero = numero.join("-");
    return numero;
  } else {
    fecha1 = fecha.split("-");
    let counter = pedido_buscar[0];
    let counter1 = counter.pedido_counter;
    counter1 = counter1.split("-");
    /*
    mesBd = counter1[1];
    diaBd = counter1[2];
    mesNow = fecha1[1];
    diaNow = fecha1[2];
    mes = Math.abs(mesBd - mesNow);
    dia = Math.abs(diaBd - diaNow);
    */
    anioBD = counter1[0];
    anioNow = fecha[0];
    anio = Math.abs(anioNow - anioBD);
    if (anio == 0) {
      fechacompro = '"' + fecha;
      let counter2 = parseInt(counter1[3]) + 1;
      counter2 = counter2.toString();
      let numero = fecha.split("-");
      numero.push(counter2);
      numero = numero.join("-");
      return numero;
    } else {
      let numero = fecha.split("-");
      numero.push("1");
      numero = numero.join("-");
      return numero;
    }
  }
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function hourNow() {
  monentoActual = new Date();
  hora = monentoActual.getHours();
  minuto = monentoActual.getMinutes();
  segundo = monentoActual.getSeconds();
  hora = hora + " : " + minuto + " : " + segundo;
  return hora;
}

module.exports = { recibir };

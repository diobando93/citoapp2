const { ipcMain } = require("electron");

const PDFDocument = require("pdfkit");
const Patient = require("../models/patient.js");
const Pedido = require("../models/pedido.js");
const Results = require("../models/results.js");

var fs = require("fs");
var resultPdf;
let nombre = "";
let edad = "";
let pedido = "";

let bethesda = "";
let nic = "";
let oms = "";
let papanicolau = "";

console.log("CARGANDO RESULTADO PROCESS");

function consultar() {
  ipcMain.on("consulta", async (e, args) => {
    //console.log(args);
    const paciente = await Patient.find({ cedula: args[0] });
    const pedido = await Pedido.find({ cedula: args[0], pedido: args[1] });
    const resultado = await Results.find({ cedula: args[0], pedido: args[1] });

    e.reply("pacienteRetrieved", JSON.stringify(paciente));
    //console.log(paciente);
    //console.log("este pedido");
    e.reply("pedidoRetrieved", JSON.stringify(pedido));
    //console.log(pedido);
    e.reply("resultadoRetrived", JSON.stringify(resultado));
  });

  ipcMain.on("datosResultado", async (e, args) => {
    //console.log(args);
    let aux = args[32].split(" ");
    let name = aux[0];
    let lastName = aux[1];
    const resultadoBD = {
      fecha: new Date().toISOString().slice(0, 10),
      hora: hourNow(),
      h_clinica: args[31],
      cedula: args[0],
      nombres: name,
      apellidos: lastName,
      pedido: args[1],
      aspecto_cuello: args[2],
      observaciones: args[3],
      responsable: args[4],
      noplacas: args[5],
      madecuada: args[6],
      minadecuada: args[7],
      frotis: args[8],

      germenes: {
        floraBarcilar: args[9],
        floraCocoide: args[10],
        vaginosisBacteriana: args[11],
        candida: args[12],
        leptotrix: args[13],
        actnomyces: args[14],
        triconomas: args[15],
        citolisis: args[16],
        herpes: args[17],
        hpv: args[18],
        histocitos: args[19],
        exudado: args[20],
        otros: args[21],
      },

      celulas: {
        endocervicales: args[22],
        metaplasticas: args[23],
        endometriales: args[24],
      },

      result_toma: {
        diagnostico: args[25],
        celulasParabasales: args[26],
        celulasIntermedias: args[27],
        celulasSuperficiales: args[28],
        control: args[29],
        observaciones: args[30],
      },
    };

    resultPdf = args;
    //console.log(resultPdf);
    //console.log(resultadoBD);
    //validar formulario
    //guardar en bd
    const newResult = new Results(resultadoBD);
    const resultadoSaved = await newResult.save();
    // generar pdf
    genPDF();
  });
}

// bug0: generar un modelo de pdf adecuado
// bug1: guardar cada pdf con un nombre distinto
// bug2: crear carpeta general o por fecha?
function genPDF() {
  escribirGermenes = [];

  if (resultPdf[6] == true) {
    muestraPDF = "Adecuada";
  } else {
    muestraPDF = "Inadecuada";
  }
  if (resultPdf[9] == true) {
    escribirGermenes.push("Flora Bacilar");
  }
  if (resultPdf[10] == true) {
    escribirGermenes.push("Flora Cocoide");
  }
  if (resultPdf[11] == true) {
    escribirGermenes.push("Vaginosis Bacteriana");
  }
  if (resultPdf[12] == true) {
    escribirGermenes.push("Candida");
  }
  if (resultPdf[13] == true) {
    escribirGermenes.push("Leptotrix");
  }
  if (resultPdf[14] == true) {
    escribirGermenes.push("Actnomyces");
  }
  if (resultPdf[15] == true) {
    escribirGermenes.push("Triconomas");
  }
  if (resultPdf[16] == true) {
    escribirGermenes.push("Citolisis");
  }
  if (resultPdf[17] == true) {
    escribirGermenes.push("Sugestivo de Herpes");
  }
  if (resultPdf[18] == true) {
    escribirGermenes.push("Sugestivo HPV");
  }
  if (resultPdf[19] == true) {
    escribirGermenes.push("Histocitos");
  }
  if (resultPdf[20] == true) {
    escribirGermenes.push("Exudado Leucocitorio");
  }
  if (resultPdf[21] == true) {
    escribirGermenes.push("Otros");
  }

  for (var key in escribirGermenes) {
    //console.log(escribirGermenes[key]);
    aux = "los germenes son: ";
    escribirGermenes[key] = " " + escribirGermenes[key] + " ";

    //aux1 = aux1 + 1;
  }

  //console.log(escribirGermenes);
  fechaToma = resultPdf[35].split("T");
  fechaToma = fechaToma[0];

  fum = resultPdf[34].split("T");
  fum = fum[0];

  //SETEAR DIAGNOSTICO

  if (resultPdf[25] == "Op1") {
    bethesda = "Negativo";
    nic = "---";
    oms = "Normal";
    papanicolau = "Clase I";
  }
  if (resultPdf[25] == "Op2") {
    bethesda = "Negativo";
    nic = "---";
    oms = "Inflamatorio";
    papanicolau = "Clase II";
  }
  if (resultPdf[25] == "Op3") {
    bethesda = "Atipia escamosa (ASCUS)";
    nic = "---";
    oms = "-----";
    papanicolau = "------";
  }
  if (resultPdf[25] == "Op4") {
    bethesda = "Atipia Endocervical NO ESPECIFICADA";
    nic = "---";
    oms = "-----";
    papanicolau = "------";
  }
  if (resultPdf[25] == "Op5") {
    bethesda = " Atipia Escamosa a favor de LIAG (ASC- H)";
    nic = "---";
    oms = "-----";
    papanicolau = "------";
  }
  if (resultPdf[25] == "Op6") {
    bethesda = "LIE de bajo grado";
    nic = "I";
    oms = "Prob. Displasia inicial";
    papanicolau = "Clase III A";
  }
  if (resultPdf[25] == "Op7") {
    bethesda = "LIE de alto grado";
    nic = "II";
    oms = "Prob. Displasia moderada";
    papanicolau = "Clase III B";
  }
  if (resultPdf[25] == "Op8") {
    bethesda = "LIE de alto grado";
    nic = "---";
    oms = "Prob. Displasia severa";
    papanicolau = "Clase III C";
  }
  if (resultPdf[25] == "Op9") {
    bethesda = "LIE de alto grado";
    nic = "III";
    oms = "Prob. Carcinoma insitu";
    papanicolau = "Clase IV";
  }
  if (resultPdf[25] == "Op10") {
    bethesda = "Carcinoma VA";
    nic = "---";
    oms = "Prob. Ca. Escamo - celular invasor";
    papanicolau = "Clase VA";
  }
  if (resultPdf[25] == "Op11") {
    bethesda = "Carcinoma VB";
    nic = "---";
    oms = "Prob. Adenocarcinoma invasor";
    papanicolau = "Clase VB";
  }

  //ESCRIBIR PDF

  const doc = new PDFDocument({ margin: 25 });
  doc.pipe(fs.createWriteStream(resultPdf[0] + "_" + resultPdf[1] + ".pdf"));
  doc
    .font("Times-Roman", 13)
    .moveDown()
    .text("Nombre Completo: " + resultPdf[32], 30, 50)
    .text("Edad: " + resultPdf[33], 350, 50)
    .moveDown()
    .text("F.U.M: " + fum, 30, 80)
    .text("Cédula: " + resultPdf[0], 350, 80)
    .moveDown()
    .text("Fecha toma: " + fechaToma, 30, 110)
    .text("Teléfono: " + resultPdf[41], 350, 110)
    .moveDown()
    .text("Solicitado por: " + resultPdf[39], 30, 140)
    .text("N° Pedido: " + resultPdf[1], 350, 140)
    .moveDown()
    .moveDown()
    .text("------------ANTECEDENTES------------", 30, 170)
    .moveDown()
    .text(
      "N° Partos: " +
        resultPdf[36] +
        " , N° Abortos: " +
        resultPdf[37] +
        " , N° Cesareas: " +
        resultPdf[38],
      30,
      200
    )
    .moveDown()
    .text("-----------VALORACIÓN DE LA MUESTRA------------", 30, 230)
    .moveDown()
    .text("La muestra es: ", 30, 260)
    .text(muestraPDF, 140, 260)
    .moveDown()
    .text("Frotis: " + resultPdf[8], 30, 290)
    .moveDown()
    .text("Gérmenes:", 30, 310)
    .moveDown()
    .text(escribirGermenes, 30, 330)
    .moveDown()
    .text("------------CÉLULAS------------", 30, 370)
    .moveDown()
    .text(
      "Endocervicales: " +
        resultPdf[22] +
        ",  Metaplásticas: " +
        resultPdf[23] +
        ", Endometriales: " +
        resultPdf[24],
      30,
      400
    )
    .moveDown()
    .text("------------RESULTADO------------", 30, 430)
    .moveDown()
    .text("BETHESDA", 30, 460)
    .text("|NIC", 270, 460)
    .text("|OMS-DHP", 300, 460)
    .text("|PAPANICOLAU", 485, 460)
    .moveDown()
    .text(bethesda, 30, 490)
    .text("| " + nic, 270, 490)
    .text("|" + oms, 300, 490)
    .text("|" + papanicolau, 485, 490)
    //.text(resultPdf[25], 50, 490)
    .moveDown()
    .text("------------Indice Hormonal------------", 30, 510)
    .moveDown()
    .text(
      "C. Parabasales: " +
        resultPdf[26] +
        " ,  C. Intermedias" +
        resultPdf[27] +
        " , C. Superficiales: " +
        resultPdf[28],
      30,
      540
    )
    .moveDown()
    .text("Control: " + resultPdf[29], 30, 570)
    .moveDown()
    .text("Observaciones: " + resultPdf[30], 30, 600);

  doc.end();
}

function hourNow() {
  monentoActual = new Date();
  hora = monentoActual.getHours();
  minuto = monentoActual.getMinutes();
  segundo = monentoActual.getSeconds();
  hora = hora + " : " + minuto + " : " + segundo;
  return hora;
}

module.exports = { consultar };
/*
ipcMain.on('get-task', async (e, args) => {
    const tasks = await Task.find();
    e.reply('response', JSON.stringify(tasks))
})
*/

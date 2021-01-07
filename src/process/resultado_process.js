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

function consultar() {
  ipcMain.on("consulta", async (e, args) => {
    console.log(args);
    const paciente = await Patient.find({ cedula: args[0] });
    const pedido = await Pedido.find({ cedula: args[0], pedido: args[1] });
    e.reply("pacienteRetrieved", JSON.stringify(paciente));
    console.log(paciente);

    e.reply("pedidoRetrieved", JSON.stringify(pedido));
    console.log(pedido);
  });

  ipcMain.on("datosResultado", async (e, args) => {
    console.log(args);

    const resultadoBD = {
      h_clinica: args[31],
      cedula: args[0],
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
    //console.log(resultadoBD);

    //validar formulario
    //guardar en bd
    //const newResult = new Results(resultadoBD);
    //const resultadoSaved = await newResult.save();
    genPDF();
    // generar pdf
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
  console.log(escribirGermenes.length);
  aux1 = 0;
  control = 0;
  for (var key in escribirGermenes) {
    //console.log(escribirGermenes[key]);
    aux = "los germenes son: ";
    escribirGermenes[key] = " " + escribirGermenes[key] + " ";

    //aux1 = aux1 + 1;
  }
  console.log(escribirGermenes);
  fechaToma = resultPdf[35].split("T");
  fechaToma = fechaToma[0];
  fecha1 = fechaNow();
  //Expected output should be: "1 year, 5 months".
  //diffDate(new Date(fechaToma), new Date(fechaNow));
  console.log(fechaToma);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("output.pdf"));
  doc
    .font("Times-Roman", 13)
    .moveDown()
    .text("Nombre Completo: " + resultPdf[32], 100, 100)
    .text("Edad: " + resultPdf[33], 400, 100)
    .moveDown()
    .text("F.U.M: Hace 10 años " + resultPdf[34], 100, 130)
    .text(
      "g: " + resultPdf[36] + "p: " + resultPdf[37] + "A: " + resultPdf[38],
      400,
      130
    )
    .moveDown()
    .text("Fecha toma: " + fechaToma, 100, 160)
    .moveDown()
    .text("Solicitado por: ")
    .moveDown()
    .text("VALORACION DE LA MUESTRA")
    .moveDown()
    .text("La muestra es: " + muestraPDF, 100, 230)
    .text(muestraPDF, 300, 230)
    .moveDown()
    .text("Frotis: " + resultPdf[8], 100, 250)
    .moveDown()
    .text("Gérmenes:")
    .moveDown()
    .text(" ")
    .moveDown()
    .text(escribirGermenes, 100, 300);

  doc.end();
}

function fechaNow() {
  monentoActual = new Date();
  year = monentoActual.getFullYear();
  month = monentoActual.getMonth();
  day = monentoActual.getDate();
  console.log(year + "-" + month + "-" + day);
  actual = year + "-" + month + "-" + day;
  return actual;
}

module.exports = { consultar };
/*
ipcMain.on('get-task', async (e, args) => {
    const tasks = await Task.find();
    e.reply('response', JSON.stringify(tasks))
})
*/

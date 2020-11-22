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
  if (resultPdf[6] == true) {
    muestraPDF = "Adecuada";
  } else {
    muestraPDF = "Inadecuada";
  }
  if ((resultPdf[9] = true)) {
    germenes1 = "Flora Bacilar";
  }
  if ((resultPdf[10] = true)) {
    germenes2 = "Flora Cocoide";
  }
  if ((resultPdf[11] = true)) {
    germenes3 = "Vaginosis Bacteriana";
  }
  if ((resultPdf[12] = true)) {
    germenes4 = "Candida";
  }
  if ((resultPdf[13] = true)) {
    germenes5 = "Leptotrix";
  }
  if ((resultPdf[14] = true)) {
    germenes6 = "Actnomyces";
  }
  if ((resultPdf[15] = true)) {
    germenes7 = "Triconomas";
  }
  if ((resultPdf[16] = true)) {
    germenes8 = "Citolisis";
  }
  if ((resultPdf[17] = true)) {
    germenes9 = "Sugestivo de Herpes";
  }
  if ((resultPdf[18] = true)) {
    germenes10 = "Sugestivo HPV";
  }
  if ((resultPdf[19] = true)) {
    germenes11 = "Histocitos";
  }
  if ((resultPdf[20] = true)) {
    germenes12 = "Exudado Leucocitorio";
  }
  if ((resultPdf[21] = true)) {
    germenes13 = "Otros";
  }

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
    .text("Fecha toma: " + resultPdf[35], 100, 160)
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
    .text("Gérmenes")
    .moveDown()
    .text(resultPdf[9], 50, 290)
    .text(resultPdf[10], 150, 290)
    .text(resultPdf[11], 250, 290)
    .text(resultPdf[12], 400, 290);

  doc.end();
}

module.exports = { consultar };
/*
ipcMain.on('get-task', async (e, args) => {
    const tasks = await Task.find();
    e.reply('response', JSON.stringify(tasks))
})
*/

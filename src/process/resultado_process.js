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
    //console.log(args);
    const resultadoBD = {
      h_clinica: args[28],
      cedula: args[0],
      pedido: args[1],
      aspecto_cuello: args[2],
      observaciones: args[3],
      responsable: args[4],
      noplacas: args[5],
      madecuada: args[6],
      minadecuada: args[7],
      minforme: args[8],
      frotis: args[9],
      fnoprocesada: args[10],
      germenes: {
        floraBarcilar: args[11],
        floraCocoide: args[12],
        vaginosisBacteriana: args[13],
        triconomas: args[14],
        actnomyces: args[15],
        candida: args[16],
        herpes: args[17],
        hpv: args[18],
        otros: args[19],
      },
      celulas: {
        endocervicales: args[20],
        metaplasticas: args[21],
        endometriales: args[22],
      },
      result_toma: {
        diagnostico: args[23],
        recomendacion: args[24],
        observaciones: args[25],
        citotecnologo: args[26],
        citopatologo: args[27],
      },
    };
    resultPdf = args;
    //console.log(resultadoBD);

    //validar formulario
    //guardar en bd
    const newResult = new Results(resultadoBD);
    const resultadoSaved = await newResult.save();
    genPDF();
    // generar pdf
  });
}

function genPDF() {
  if (resultPdf[6] == true) {
    muestraPDF = "xxx  Adecuada";
    muestra1PDF = "    Inadecuada";
  } else {
    muestraPDF = "Adecuada   ";
    muestra1PDF = "xxx Inadecuada";
  }

  if (resultPdf[7] == true) {
    muestraPDF = "xxx  Inadecuada";
    muestra1PDF = "    Adecuada   ";
  }
  if (resultPdf[11] == true) {
    floraBarcilarPDF = "xxx  Flora Bacilar";
  } else {
    floraBarcilarPDF = "Flora Bacilar";
  }
  if (resultPdf[12] == true) {
    floraCocoidePDF = "xxx  Flora Cocoide";
  } else {
    floraCocoidePDF = "Flora Cocoide";
  }
  if (resultPdf[13] == true) {
    vaginosisBacterianaPDF = "xxx  Vaginosis Bacteriana";
  } else {
    vaginosisBacterianaPDF = "Vaginosis Bacteriana";
  }
  if (resultPdf[14] == true) {
    triconomasPDF = "xxx  Triconomas";
  } else {
    triconomasPDF = "Triconomas";
  }

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("output.pdf"));
  doc
    .font("Times-Roman", 13)
    .moveDown()
    .text("Nombre Completo: " + resultPdf[29], 100, 100)
    .text("Edad: " + resultPdf[30], 400, 100)
    .moveDown()
    .text("F.U.M: Hace 10 años " + resultPdf[31], 100, 130)
    .text("g: " + resultPdf[33] + "p: " + resultPdf[34], 400, 130)
    .moveDown()
    .text("Fecha toma: " + resultPdf[32], 100, 160)
    .moveDown()
    .text("Solicitado por: ")
    .moveDown()
    .text("VALORACION DE LA MUESTRA")
    .moveDown()
    .text("La muestra es: " + muestraPDF, 100, 230)
    .text(muestra1PDF, 300, 230)
    .moveDown()
    .text("Frotis: " + resultPdf[9], 100, 250)
    .moveDown()
    .text("Gérmenes")
    .moveDown()
    .text(floraBarcilarPDF, 50, 290)
    .text(floraCocoidePDF, 150, 290)
    .text(vaginosisBacterianaPDF, 250, 290)
    .text(triconomasPDF, 400, 290);

  doc.end();
}

module.exports = { consultar };
/*
ipcMain.on('get-task', async (e, args) => {
    const tasks = await Task.find();
    e.reply('response', JSON.stringify(tasks))
})
*/

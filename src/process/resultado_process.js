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
    //
    const pedido = await Pedido.find({ pedido: args });
    //console.log(pedido);
    let cedula = pedido[0].cedula;
    const paciente = await Patient.find({ cedula: cedula });
    //console.log(cedula);
    const resultado = await Results.find({ cedula: cedula, pedido: args });

    const resultadoBack = await Results.find({ cedula: cedula });

    e.reply("pacienteRetrieved", JSON.stringify(paciente));
    //console.log(paciente);
    //console.log("este pedido");
    e.reply("pedidoRetrieved", JSON.stringify(pedido));
    //console.log(pedido);
    e.reply("resultadoRetrived", JSON.stringify(resultado));

    e.reply("resultadoBack", JSON.stringify(resultadoBack));
  });

  ipcMain.on("datosResultado", async (e, args) => {
    //console.log(args);
    let aux = args[30].split(" ");
    let name = aux[0];
    let lastName = aux[1];
    const resultadoBD = {
      fecha: new Date().toISOString().slice(0, 10),
      hora: hourNow(),
      h_clinica: args[29],
      cedula: args[38],
      nombres: name,
      apellidos: lastName,
      pedido: args[40],
      aspecto_cuello: args[0],
      observaciones: args[1],
      responsable: args[2],
      noplacas: args[3],
      madecuada: args[4],
      minadecuada: args[5],
      frotis: args[6],

      germenes: {
        floraBarcilar: args[7],
        floraCocoide: args[8],
        vaginosisBacteriana: args[9],
        candida: args[10],
        leptotrix: args[11],
        actnomyces: args[12],
        triconomas: args[13],
        citolisis: args[14],
        herpes: args[15],
        hpv: args[16],
        histocitos: args[17],
        exudado: args[18],
        otros: args[19],
      },

      celulas: {
        endocervicales: args[20],
        metaplasticas: args[21],
        endometriales: args[22],
      },

      result_toma: {
        diagnostico: args[23],
        celulasParabasales: args[24],
        celulasIntermedias: args[25],
        celulasSuperficiales: args[26],
        control: args[27],
        observaciones: args[28],
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
  fechaActual = new Date().toISOString().slice(0, 10);

  if (resultPdf[4] == true) {
    muestraPDF = "Adecuada";
  } else {
    muestraPDF = "Inadecuada";
  }
  if (resultPdf[7] == true) {
    escribirGermenes.push("Flora Bacilar");
  }
  if (resultPdf[8] == true) {
    escribirGermenes.push("Flora Cocoide");
  }
  if (resultPdf[9] == true) {
    escribirGermenes.push("Vaginosis Bacteriana");
  }
  if (resultPdf[10] == true) {
    escribirGermenes.push("Candida");
  }
  if (resultPdf[11] == true) {
    escribirGermenes.push("Leptotrix");
  }
  if (resultPdf[12] == true) {
    escribirGermenes.push("Actnomyces");
  }
  if (resultPdf[13] == true) {
    escribirGermenes.push("Triconomas");
  }
  if (resultPdf[14] == true) {
    escribirGermenes.push("Citolisis");
  }
  if (resultPdf[15] == true) {
    escribirGermenes.push("Sugestivo de Herpes");
  }
  if (resultPdf[16] == true) {
    escribirGermenes.push("Sugestivo HPV");
  }
  if (resultPdf[17] == true) {
    escribirGermenes.push("Histocitos");
  }
  if (resultPdf[18] == true) {
    escribirGermenes.push("Exudado Leucocitorio");
  }
  if (resultPdf[19] == true) {
    escribirGermenes.push("Otros");
  }

  for (var key in escribirGermenes) {
    //console.log(escribirGermenes[key]);
    aux = "los germenes son: ";
    escribirGermenes[key] = " " + escribirGermenes[key] + " ";

    //aux1 = aux1 + 1;
  }

  //console.log(escribirGermenes);
  fechaToma = resultPdf[33].split("T");
  fechaToma = fechaToma[0];

  fum = resultPdf[32].split("T");
  fum = fum[0];

  //SETEAR DIAGNOSTICO

  if (resultPdf[23] == "Op1") {
    bethesda = "Negativo";
    nic = "---";
    oms = "Normal";
    papanicolau = "Clase I";
  }
  if (resultPdf[23] == "Op2") {
    bethesda = "Negativo";
    nic = "---";
    oms = "Inflamatorio";
    papanicolau = "Clase II";
  }
  if (resultPdf[23] == "Op3") {
    bethesda = "Atipia escamosa (ASCUS)";
    nic = "---";
    oms = "-----";
    papanicolau = "------";
  }
  if (resultPdf[23] == "Op4") {
    bethesda = "Atipia Endocervical NO ESPECIFICADA";
    nic = "---";
    oms = "-----";
    papanicolau = "------";
  }
  if (resultPdf[23] == "Op5") {
    bethesda = " Atipia Escamosa a favor de LIAG (ASC- H)";
    nic = "---";
    oms = "-----";
    papanicolau = "------";
  }
  if (resultPdf[23] == "Op6") {
    bethesda = "LIE de bajo grado";
    nic = "I";
    oms = "Prob. Displasia inicial";
    papanicolau = "Clase III A";
  }
  if (resultPdf[23] == "Op7") {
    bethesda = "LIE de alto grado";
    nic = "II";
    oms = "Prob. Displasia moderada";
    papanicolau = "Clase III B";
  }
  if (resultPdf[23] == "Op8") {
    bethesda = "LIE de alto grado";
    nic = "---";
    oms = "Prob. Displasia severa";
    papanicolau = "Clase III C";
  }
  if (resultPdf[23] == "Op9") {
    bethesda = "LIE de alto grado";
    nic = "III";
    oms = "Prob. Carcinoma insitu";
    papanicolau = "Clase IV";
  }
  if (resultPdf[23] == "Op10") {
    bethesda = "Carcinoma VA";
    nic = "---";
    oms = "Prob. Ca. Escamo - celular invasor";
    papanicolau = "Clase VA";
  }
  if (resultPdf[23] == "Op11") {
    bethesda = "Carcinoma VB";
    nic = "---";
    oms = "Prob. Adenocarcinoma invasor";
    papanicolau = "Clase VB";
  }

  //ESCRIBIR PDF

  const doc = new PDFDocument({ margin: 25 });
  doc.pipe(fs.createWriteStream(resultPdf[38] + "_" + resultPdf[40] + ".pdf"));
  doc
    .font("Times-Roman", 13)
    .image("images/Logo.jpeg", 15, 15, { width: 100 })
    .text("Fecha de informe: " + fechaActual, 450, 30)
    .rect(15, 95, 575, 20)
    .fillAndStroke("#040887", "#000")
    .fill("#ffffff")
    .stroke()
    .fontSize(16)
    .text("RESULTADO DE EXAMEN CITOLÓGICO", 155, 100, { lineBreak: false })
    .fill("#000")
    .stroke()
    .fontSize(13)
    .moveDown()
    .text("Nombre Completo: " + resultPdf[30], 30, 125)
    .text("Edad: " + resultPdf[31], 350, 125)
    .moveDown()
    .text("F.U.M: " + fum, 30, 150)
    .text("Cédula: " + resultPdf[38], 350, 150)
    .moveDown()
    .text("Toma de la muestra: " + fechaToma, 30, 180)
    .text("Teléfono: " + resultPdf[39], 350, 180)
    .moveDown()
    .text("Solicitado por: " + resultPdf[37], 30, 205)
    .text("N° Pedido: " + resultPdf[40], 350, 205)
    .moveDown()
    .moveTo(30, 225)
    .lineTo(550, 225)
    .stroke()
    .moveDown()
    .text("ANTECEDENTES", 30, 235)
    .moveDown()
    .text(
      "N° Partos: " +
        resultPdf[34] +
        " , N° Abortos: " +
        resultPdf[35] +
        " , N° Cesareas: " +
        resultPdf[36],
      30,
      265
    )
    .moveDown()
    .moveTo(30, 285)
    .lineTo(550, 285)
    .stroke()
    .text("VALORACIÓN DE LA MUESTRA", 30, 295)
    .moveDown()
    .text("Muestra: ", 30, 325)
    .text(muestraPDF, 100, 325)
    .moveDown()
    .text("Frotis: ", 30, 350)
    .text(resultPdf[6], 100, 350)
    .moveDown()
    .text("Gérmenes: ", 30, 375)
    .moveDown()
    .text(escribirGermenes, 100, 375)
    .moveDown()
    .moveTo(30, 425)
    .lineTo(550, 425)
    .stroke()
    .text("CÉLULAS", 30, 435)
    .moveDown()
    .text(
      "Endocervicales: " +
        resultPdf[20] +
        ",  Metaplásticas: " +
        resultPdf[21] +
        ", Endometriales: " +
        resultPdf[22],
      30,
      465
    )
    .moveDown()
    .moveTo(30, 485)
    .lineTo(550, 485)
    .stroke()
    .text("RESULTADO", 30, 495)
    .moveDown()
    .text("BETHESDA", 30, 525)
    .text("|NIC", 270, 525)
    .text("|OMS-DHP", 300, 525)
    .text("|PAPANICOLAU", 485, 525)
    .moveDown()
    .text(bethesda, 30, 555)
    .text("| " + nic, 270, 555)
    .text("|" + oms, 300, 555)
    .text("|" + papanicolau, 485, 555)
    //.text(resultPdf[25], 50, 555)
    .moveDown()
    .moveTo(30, 575)
    .lineTo(550, 575)
    .stroke()
    .text("ÍNDICE HORMONAL", 30, 585)
    .moveDown()
    .text(
      "C. Parabasales: " +
        resultPdf[24] +
        " ,  C. Intermedias" +
        resultPdf[25] +
        " , C. Superficiales: " +
        resultPdf[26],
      30,
      605
    )
    .moveDown()
    .text("Control: " + resultPdf[27], 30, 635)
    .moveDown()
    .text("Observaciones: " + resultPdf[28], 30, 665);

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

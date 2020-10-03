const {ipcMain} = require('electron');

const PDFDocument = require('pdfkit');
const Patient = require('../models/patient.js');
const Pedido = require('../models/pedido.js');
const Results = require('../models/results.js');

var fs = require('fs');
var resultPdf
let nombre = '';
let edad = '';
let pedido = '';


function consultar(){
    ipcMain.on('consulta', async(e, args) =>{
        console.log(args);
        const paciente = await Patient.find({cedula: args[0]});
        const pedido = await Pedido.find({cedula: args[0], pedido: args[1]});
        e.reply('pedidoRetrieved', JSON.stringify(pedido));
        console.log(pedido);
        e.reply('pacienteRetrieved', JSON.stringify(paciente));
        console.log(paciente);
        //nombre = nombre.concat(paciente.nombres);
        //console.log(nombre);
        //nombre = 'Nombre: ' //+ paciente.nombres;
        //edad = 'Edad: ' //+ pedido.edad;
        //pedido = 'Pedido: ' //+ pedido.pedido;
        //console.log(pedido);
        /*

        */
    })
    ipcMain.on('datosResultado', async (e, args) => {
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
            }

        }
        resultPdf = resultadoBD;
        //console.log(resultadoBD);

        //validar formulario
        //guardar en bd
        const newResult = new Results(resultadoBD);
        const resultadoSaved = await newResult.save();
        genPDF();
        // generar pdf

    });
}

function genPDF(){
    console.log(resultPdf);
    console.log(nombre);
    //console.log(edad);
    //console.log(pedido);

    //texto  = texto.concat(paciente.nombres);
    /*
    const doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.text(texto, {
        columns: 3,
        columnGap: 15,
        height: 100,
        width: 465,
        align: 'justify'
    });
    doc.end();
    */
}


module.exports ={consultar}
/*
ipcMain.on('get-task', async (e, args) => {
    const tasks = await Task.find();
    e.reply('response', JSON.stringify(tasks))
})
*/

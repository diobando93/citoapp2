const {ipcMain} = require('electron');
const PDFDocument = require('pdfkit');
const Patient = require('../models/patient.js');
const Pedido = require('../models/pedido.js');

var fs = require('fs');


function consultar(){
    ipcMain.on('consulta', async(e, args) =>{
        console.log(args);
        const paciente = await Pedido.findOne({cedula: args},
            'apellidos nombres').exec();
        const pedido = await Pedido.find({cedula: args});
        e.reply('response', JSON.stringify(paciente));
        console.log(paciente.nombres);
        console.log(pedido);
        let texto = 'Nombre: '
        texto  = texto.concat(paciente.nombres);
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
    })
}


module.exports ={consultar}
/*
ipcMain.on('get-task', async (e, args) => {
    const tasks = await Task.find();
    e.reply('response', JSON.stringify(tasks))
})
*/

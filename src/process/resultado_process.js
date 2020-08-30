const {ipcMain} = require('electron');
const Patient = require('../models/patient.js');
const Antecedent = require('../models/pedido.js');
function consultar(){
    ipcMain.on('consulta', async(e, args) =>{
        console.log(args);
        const paciente = await Patient.findOne({cedula: args},
            'apellidos nombres').exec();
        e.reply('response', JSON.stringify(paciente));
        console.log(paciente);
    })
}


module.exports ={consultar}
/*
ipcMain.on('get-task', async (e, args) => {
    const tasks = await Task.find();
    e.reply('response', JSON.stringify(tasks))
})
*/

const {ipcMain} = require('electron');
const Patient = require('../models/patient.js');
const validaciones = require('./validaciones.js')
//recibe datos desde el pedido_render
function recibir(){
    ipcMain.on('datos',  (e, args) =>{
        let envia0 = true;
        let envia1 = true;
        let datosVacios = [args[0], args[1], args[2], args[3], args[4]];
        let datosNumeros = [args[0], args[4]];
        envia0 = validaciones.verificarVacio(datosVacios);
        envia1 = validaciones.verificarNumero(datosNumeros);
        if (envia0 == true && envia1=== true){
            console.log('formulario correcto');
        }else{
            console.log('formulario incorrecto');
        };
    });
}
module.exports = {recibir};

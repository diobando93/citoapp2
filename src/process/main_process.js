const {BrowserWindow, ipcMain, app} = require('electron');
const {recibir} = require('./pedido_process.js');
const {consultar} = require('./resultado_process.js');

function createWindow(){
    const win = new BrowserWindow({
            width: 800,
            heigth: 500,
            webPreferences: {
                nodeIntegration: true
            }
    });
    win.loadFile('src/ui//templates/main.html')
};

ipcMain.on('envio-datos-paciente', (e, args) => {
    app.whenReady().then(recibir)
});

ipcMain.on('consulta-datos-paciente', (e, args) =>{
    app.whenReady().then(consultar)
})


module.exports = {createWindow};
/*


const patient = {

    dat_personales : {
        cedula:  cedula.value,
        //h_clinica = h_clinica.value,
        nombres:  nombres.value,
        apellidos: apellidos.value,
        edad: edad.value
        //f_nacimiento = f_nacimiento.value,
    },

    domicilio : {
        pais : pais.value,
        provincia : provincia.value,
        canton : canton.value,
        parroquia : parroquia.value,
        ciudad : ciudad.value,
        direccion : direccion.value,
        sector : sector.value
    }
    /*
    estudios = {
        instruccion =  instruccion.value,
        ocupacion = ocupacion.value,
        ins_jefefamilia = ins_jefefamilia.value,
        ocu_jefefamilia = ocu_jefefamilia.value
    }
    */

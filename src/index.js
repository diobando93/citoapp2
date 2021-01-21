const {createWindow} = require('./process/main_process');
const {app} = require('electron');
const Patient = require('./models/patient.js');
const Institucion = require('./models/establecimiento.js');

let pedido = false

//const {new_Patient} = require('./process/pedido_process.js');
//Conectar con la base de datos
require('./database.js');
//require('./process/pedido_process.js');

//Invocar al main process
app.whenReady().then(createWindow);
app.allowRendererProcessReuse = false;

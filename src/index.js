const {createWindow} = require('./process/main_process');
const {app} = require('electron');
const Patient = require('./models/patient.js');
let pedido = false
//const {new_Patient} = require('./process/pedido_process.js');
require('./database.js');
//require('./process/pedido_process.js');

app.whenReady().then(createWindow);
app.allowRendererProcessReuse = false;

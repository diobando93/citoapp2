const {createWindow} = require('./process/main_process');
const {app} = require('electron');


app.whenReady().then(createWindow);
app.allowRendererProcessReuse = false

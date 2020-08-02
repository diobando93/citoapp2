const electron = require('electron');
const {ipcRenderer} = electron;
const cedula = document.querySelector(".col-75 input[name = 'nombre']");
function consulta_render(){
    ipcRenderer.send('consulta', nombre.value);
    ipcRenderer.on('response', (e, args) =>{
        const datos = JSON.parse(args);
        console.log(datos);
    })
}

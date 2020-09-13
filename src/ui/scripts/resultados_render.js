const electron = require('electron');
const {ipcRenderer} = electron;
const cedula = document.getElementById("Cedula");
function consulta_render(){
    ipcRenderer.send('consulta', pedido.value);
    ipcRenderer.on('response', (e, args) =>{
        const datos = JSON.parse(args);
        console.log(datos);
    })
}

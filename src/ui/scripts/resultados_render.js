const electron = require('electron');
const {ipcRenderer} = electron;
const cedula = document.querySelector(".col-75 input[name = 'Cedu']");
function consulta_render(){
    ipcRenderer.send('consulta', cedula.value);
    ipcRenderer.on('response', (e, args) =>{
        console.log(args);
        const resultado = JSON.parse(args);
        console.log(resultado.nombres);
    })
}

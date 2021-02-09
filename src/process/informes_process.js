const { ipcMain } = require("electron");
const Informes = require("../models/results.js");

let ficha = [];

console.log("CARGANDO INFORMES PROCESS");

function reports() {
  ipcMain.on("consulta-informes", async (e, args) => {
      ficha = await checkInformes();
      //console.log(ficha);
    e.returnValue = JSON.stringify(ficha);
  });
  //  ipcMain.on("hola", (e, args) => {
  //console.log(args);
  //});
}
/*  
  ipcMain.on("consulta-informes", async (e, args) => {
    ficha = await checkInformes();
    e.returnValue = JSON.stringify(ficha);
  });
}


*/
async function checkInformes() {
  let resultados = await Informes.find();
  return resultados;
}

module.exports = { reports };

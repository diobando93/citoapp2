const { ipcMain } = require("electron");
const Pedido = require("../models/pedido.js");

let ficha = [];

console.log("CARGANDO CONSULTA DE PEDIDOS PROCESS");

function pedidos() {
  ipcMain.on("consulta-de-pedidos", async (e, args) => {
    ficha = await checkPedidos();
    e.returnValue = JSON.stringify(ficha);
  });
}

async function checkPedidos() {
  let pedidos = await Pedido.find();

  if (pedidos.length == 0) {
    console.log("no existen pacientes registrados aún");
  }
  return pedidos;
}

module.exports = { pedidos };

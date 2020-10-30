const electron = require("electron");
const { ipcRenderer } = electron;
const cedula = document.getElementById("cedula");
const pedido = document.getElementById("pedido");
let cedula1 = document.getElementById("cedula1");
let pedido1 = document.getElementById("pedido1");
let nombre = document.getElementById("nombre");
let fechaIngreso = document.getElementById("fechaIngreso");
let fechaMuestra = document.getElementById("fechaMuestra");
let establecimiento = document.getElementById("establecimiento");
let edad = document.getElementById("edad");
let provincia = document.getElementById("provincia");
let canton = document.getElementById("canton");
let parroquia = document.getElementById("parroquia");
const udiagnostico = document.getElementById("udiagnostico");
const sdiagnostico = document.getElementById("sdiagnostico");
let hclinica = document.getElementById("numeroInforme");
const fechaInforme = document.getElementById("fechaInforme");
const gestaciones = document.getElementById("gestaciones");
const partos = document.getElementById("partos");
const abortos = document.getElementById("abortos");
const acuello = document.getElementById("acuello");
const observaciones = document.getElementById("observaciones");
const responsable = document.getElementById("responsable");
const noplacas = document.getElementById("noplacas");
const madecuada = document.getElementById("madecuada");
const minadecuada = document.getElementById("minadecuada");
const noinformar = document.getElementById("noinformar");
const frotis = document.getElementById("frotis");
const fnoprocesada = document.getElementById("fnoprocesada");
const fbacilar = document.getElementById("fbacilar");
const fcocoide = document.getElementById("fcocoide");
const vbacteriana = document.getElementById("vbacteriana");
const triconomas = document.getElementById("triconomas");
const actnomyces = document.getElementById("actnomyces");
const candida = document.getElementById("candida");
const herpes = document.getElementById("herpes");
const hpv = document.getElementById("hpv");
const germenesotros = document.getElementById("germenesotros");
const endocervicales = document.getElementById("endocervicales");
const metaplasticas = document.getElementById("metaplasticas");
const endometriales = document.getElementById("endometriales");
const diagnostico = document.getElementById("diagnostico");
const recomendacion = document.getElementById("recomendacion");
const reobservaciones = document.getElementById("reobservaciones");
const citopatologo = document.getElementById("citopatologo");
const citotecnologo = document.getElementById("citotecnologo");

let datosResultado = [];

function consulta_render() {
  ipcRenderer.on("response", (e, args) => {
    const datos = JSON.parse(args);
    console.log(datos);
  });
}

function retrive() {
  datosResultado = [];
  console.log(cedula.value);
  console.log(pedido.value);
  datosResultado.push(cedula.value);
  datosResultado.push(pedido.value);
  ipcRenderer.send("consulta", datosResultado);
  ipcRenderer.on("pedidoRetrieved", (e, args) => {
    const pedidoRetrieved = JSON.parse(args);
    console.log(pedidoRetrieved);
    edadPDF = pedidoRetrieved[0].edad;
    fumPDF = pedidoRetrieved[0].fecha_ult_mestruacion;
    fmuestraPDF = pedidoRetrieved[0].f_muestra;
    partosPDF = pedidoRetrieved[0].num_partos;
    abortosPDF = pedidoRetrieved[0].num_abortos;
    //pedido1.innerHTML = pedidoRetrieved[0].pedido;
    //datosResultado.push(args[])
  });
  ipcRenderer.on("pacienteRetrieved", (e, args) => {
    const pacienteRetrieved = JSON.parse(args);
    console.log(pacienteRetrieved);
    nombrePDF =
      pacienteRetrieved[0].nombres + " " + pacienteRetrieved[0].apellidos;
    hclinicaPDF = pacienteRetrieved[0].h_clinica;

    //console.log(pacienteRetrieved[0].nombres);
    nombre.innerHTML =
      pacienteRetrieved[0].nombres + " " + pacienteRetrieved[0].apellidos;
    document.getElementById("datosBusqueda").style.display = "none";
  });
}

function enviaDatos() {
  datosResultado.push(acuello.value);
  datosResultado.push(observaciones.value);
  datosResultado.push(responsable.value);
  datosResultado.push(noplacas.value);
  datosResultado.push(madecuada.checked);
  datosResultado.push(minadecuada.checked);
  datosResultado.push(noinformar.value);
  datosResultado.push(frotis.value);
  datosResultado.push(fnoprocesada.value);
  datosResultado.push(fbacilar.checked);
  datosResultado.push(fcocoide.checked);
  datosResultado.push(vbacteriana.checked);
  datosResultado.push(triconomas.checked);
  datosResultado.push(actnomyces.checked);
  datosResultado.push(candida.checked);
  datosResultado.push(herpes.checked);
  datosResultado.push(hpv.checked);
  datosResultado.push(germenesotros.checked);
  datosResultado.push(endocervicales.value);
  datosResultado.push(metaplasticas.value);
  datosResultado.push(endometriales.value);
  datosResultado.push(diagnostico.value);
  datosResultado.push(recomendacion.value);
  datosResultado.push(reobservaciones.value);
  datosResultado.push(citopatologo.checked);
  datosResultado.push(citotecnologo.checked);
  datosResultado.push(hclinicaPDF);
  datosResultado.push(nombrePDF);
  datosResultado.push(edadPDF);
  datosResultado.push(fumPDF);
  datosResultado.push(fmuestraPDF);
  datosResultado.push(partosPDF);
  datosResultado.push(abortosPDF);
  console.log(datosResultado);
  ipcRenderer.send("datosResultado", datosResultado);
}

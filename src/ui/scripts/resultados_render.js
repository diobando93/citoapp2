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
let udiagnostico = document.getElementById("udiagnostico");
let sdiagnostico = document.getElementById("sdiagnostico");
let hclinica = document.getElementById("hclinica");
let fechaInforme = document.getElementById("fechaInforme");
let gestaciones = document.getElementById("gestaciones");
let partos = document.getElementById("partos");
let abortos = document.getElementById("abortos");

const acuello = document.getElementById("acuello");
const observaciones = document.getElementById("observaciones");
const responsable = document.getElementById("responsable");
const noplacas = document.getElementById("noplacas");
const madecuada = document.getElementById("madecuada");
const minadecuada = document.getElementById("minadecuada");
const frotis = document.getElementById("frotis");

const fbacilar = document.getElementById("fbacilar");
const fcocoide = document.getElementById("fcocoide");
const vbacteriana = document.getElementById("vbacteriana");
const candida = document.getElementById("candida");
const leptotrix = document.getElementById("leptotrix");
const actnomyces = document.getElementById("actnomyces");
const triconomas = document.getElementById("triconomas");
const citolisis = document.getElementById("citolisis");
const herpes = document.getElementById("herpes");
const hpv = document.getElementById("hpv");
const histocitos = document.getElementById("histocitos");
const exudado = document.getElementById("exudado");
const germenesotros = document.getElementById("germenesotros");

const endocervicales = document.getElementById("endocervicales");
const metaplasticas = document.getElementById("metaplasticas");
const endometriales = document.getElementById("endometriales");

const diagnostico = document.getElementById("diagnostico");
const icparabasal = document.getElementById("icparabasal");
const icintermedias = document.getElementById("icintermedias");
const icsuperficiales = document.getElementById("icsuperficiales");
const rcontrol = document.getElementById("rcontrol");
const reobservaciones = document.getElementById("reobservaciones");

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
        console.log("day")
        console.log(fumPDF);
        fmuestraPDF = pedidoRetrieved[0].f_muestra;
        partosPDF = pedidoRetrieved[0].num_partos;
        abortosPDF = pedidoRetrieved[0].num_abortos;
        cesareasPDF = pedidoRetrieved[0].num_cesareas;
        medicoPDF = pedidoRetrieved[0].medico;

        pedido1.innerHTML = pedidoRetrieved[0].pedido;
        edad.innerHTML = pedidoRetrieved[0].edad;
        fechaIngreso.innerHTML = pedidoRetrieved[0].fecha;
        fechaMuestra.innerHTML = pedidoRetrieved[0].f_muestra;
        establecimiento.innerHTML = pedidoRetrieved[0].establecimiento;
        provincia.innerHTML = pedidoRetrieved[0].ubicacion.provincia;
        canton.innerHTML = pedidoRetrieved[0].ubicacion.canton;
        parroquia.innerHTML = pedidoRetrieved[0].ubicacion.parroquia;
        udiagnostico.innerHTML = "preguntar dato 1";
        sdiagnostico.innerHTML = "preguntar dato 2";
        fechaInforme.innerHTML = "preguntar si es el actual 3";
        gestaciones.innerHTML =
            pedidoRetrieved[0].num_partos +
            pedidoRetrieved[0].num_cesareas +
            pedidoRetrieved[0].num_abortos;
        partos.innerHTML = pedidoRetrieved[0].num_partos;
        abortos.innerHTML = pedidoRetrieved[0].num_abortos;
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
        cedula1.innerHTML = pacienteRetrieved[0].cedula;
        hclinica.innerHTML = pacienteRetrieved[0].h_clinica;

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
    datosResultado.push(frotis.value);
    datosResultado.push(fbacilar.checked);
    datosResultado.push(fcocoide.checked);
    datosResultado.push(vbacteriana.checked);
    datosResultado.push(candida.checked);
    datosResultado.push(leptotrix.checked);
    datosResultado.push(actnomyces.checked);
    datosResultado.push(triconomas.checked);
    datosResultado.push(citolisis.checked);
    datosResultado.push(herpes.checked);
    datosResultado.push(hpv.checked);
    datosResultado.push(histocitos.checked);
    datosResultado.push(exudado.checked);
    datosResultado.push(germenesotros.checked);
    datosResultado.push(endocervicales.value);
    datosResultado.push(metaplasticas.value);
    datosResultado.push(endometriales.value);
    datosResultado.push(diagnostico.value);
    datosResultado.push(icparabasal.value);
    datosResultado.push(icintermedias.value);
    datosResultado.push(icsuperficiales.value);
    datosResultado.push(rcontrol.value);
    datosResultado.push(reobservaciones.value);
    datosResultado.push(hclinicaPDF);
    datosResultado.push(nombrePDF);
    datosResultado.push(edadPDF);
    datosResultado.push(fumPDF);
    datosResultado.push(fmuestraPDF);
    datosResultado.push(partosPDF);
    datosResultado.push(abortosPDF);
    datosResultado.push(cesareasPDF);
    datosResultado.push(medicoPDF);
    datosResultado.push(cedula1);
    console.log(datosResultado);
    ipcRenderer.send("datosResultado", datosResultado);
    ipcRenderer.send("regresar-resultados", "regresar-resultados");
}

function cancelar() {

    ipcRenderer.send("regresar-resultados", "regresar-resultados");    
}

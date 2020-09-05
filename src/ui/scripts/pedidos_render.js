const electron = require('electron');
const {ipcRenderer} = electron;
const cedula = document.getElementById("Cedula");
const h_clinica = document.getElementById("h_clinica");
const establecimiento =document.getElementById("establecimiento");
const nombres = document.getElementById("Nombre");
const apellidos = document.getElementById("Apellido");
const edad = document.getElementById("edad");
const f_nacimiento = document.getElementById("f_nacimiento");
const pais = document.getElementById("pais");
const provincia = document.getElementById("provincia");
const canton = document.getElementById("canton");
const parroquia = document.getElementById("parroquia");
const sector = document.getElementById("sector");
const instruccion = document.getElementById("instruccion");
const ocupacion = document.getElementById("ocupacion");
const ins_jefefamilia = document.getElementById("ins_jefefamilia");
const ocu_jefefamilia = document.getElementById("ocu_jefefamilia");
const est_toma_muestra  = document.getElementById("est_toma_muestra");
const f_muestra = document.getElementById("f_muestra");
const f_menstruacion = document.getElementById("f_menstruacion");
const metodo_planificacion = document.getElementById("metodo_planificacion");
const num_partos = document.getElementById("num_partos");
const num_abortos = document.getElementById("num_abortos");
const edad_vid_sexual = document.getElementById("edad_vid_sexual")
const embarazo = document.getElementById("embarazo");
const lactancia = document.getElementById("lactancia");
const destruccion_local = document.getElementById("chkDestrlocal");
const conizacion = document.getElementById("chkConizacion");
const histectomia = document.getElementById("chkHistectomia");
const radioterapia = document.getElementById("chkRadioterapia");
const hormonoterapia = document.getElementById("chkHormonoterapia");
const onco_otros = document.getElementById("chkTratamOncol");
const citologiaSi = document.getElementById("rdSi");
const citologiaNo = document.getElementById("rdNo");
const NumCitologias = document.getElementById("numCitologias");
const citologiaAnios = document.getElementById("numAnios");
const citologiaMeses = document.getElementById("numMeses");

//let enviar = false;
let datos = [];
var provinciasDB = [];
var cantonesDB = [];
var parroquiasDB = [];
var numPedido = '';
var hClinica = '';

var input = document.getElementById("Cedula");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        //console.log(cedula.value);
        event.preventDefault();
        ipcRenderer.on('numPedido', (e, args) =>{
            numPedido = args;
            //console.log(args);
        });
        ipcRenderer.on('hClinica', (e, args) => {
            hClinica = args;
            //console.log(args);
        });
        provinciasDB = JSON.parse(ipcRenderer.sendSync('cedula', cedula.value));
        //console.log(provinciasDB);
        var dropBox = document.getElementById("provincia");
        for (var key in provinciasDB) {
            dropBox.options.add(new Option(provinciasDB[key]));
        }
        var x = document.getElementById("Nombre");
        if (x.style.display === "none") {
            document.getElementById('establecimiento').style.display = 'block';
            document.getElementById('Nombre').style.display = 'block';
            document.getElementById('edad').style.display = 'block';
            document.getElementById('Apellido').style.display = 'block';
            document.getElementById('f_nacimiento').style.display = 'block';
            document.getElementById('pais').style.display = 'block';
            document.getElementById('provincia').style.display = 'block';
            document.getElementById('canton').style.display = 'block';
            document.getElementById('parroquia').style.display = 'block';
            document.getElementById('sector').style.display = 'block';
            document.getElementById('instruccion').style.display = 'block';
            document.getElementById('ocupacion').style.display = 'block';
            document.getElementById('ins_jefefamilia').style.display = 'block';
            document.getElementById('ocu_jefefamilia').style.display = 'block';
            document.getElementById('est_toma_muestra').style.display = 'block';
            document.getElementById('f_muestra').style.display = 'block';
            document.getElementById('f_menstruacion').style.display = 'block';
            document.getElementById('metodo_planificacion').style.display = 'block';
            document.getElementById('dat1').style.display = 'block';
            document.getElementById('dat2').style.display = 'block';
            document.getElementById('dat3').style.display = 'block';
            document.getElementById('num_partos').style.display = 'block';
            document.getElementById('num_abortos').style.display = 'block';
            document.getElementById('edad_vid_sexual').style.display = 'block';

        }
    }
});


function pedido_render(){
    datos.push(cedula.value);
    datos.push(hClinica);
    datos.push(establecimiento.value);
    datos.push(nombres.value);
    datos.push(apellidos.value);
    datos.push(edad.value);
    datos.push(f_nacimiento.value);
    datos.push(pais.value);
    datos.push(provincia.value);
    datos.push(canton.value);
    datos.push(parroquia.value);
    datos.push(sector.value);
    datos.push(instruccion.value);
    datos.push(ocupacion.value);
    datos.push(ins_jefefamilia.value);
    datos.push(ocu_jefefamilia.value);
    datos.push(f_muestra.value);
    datos.push(f_menstruacion.value);
    datos.push(metodo_planificacion.value);
    datos.push(num_partos.value);
    datos.push(num_abortos.value);
    datos.push(edad_vid_sexual.value);
    datos.push(embarazo.value);
    datos.push(lactancia.value);
    datos.push(destruccion_local.value);
    datos.push(conizacion.checked);
    datos.push(histectomia.value);
    datos.push(radioterapia.value);
    datos.push(hormonoterapia.value);
    datos.push(onco_otros.value);
    datos.push(citologiaSi.checked);
    datos.push(citologiaNo.value);
    datos.push(NumCitologias.value);
    datos.push(citologiaAnios.value);
    datos.push(citologiaMeses.value);
    datos.push(numPedido);
    console.log(datos)
    ipcRenderer.send('datos', datos);
    datos = [];
};

function getProvincia(){
    var dropBox = document.getElementById("provincia");
    var dropProvincia = dropBox.options[dropBox.selectedIndex].value;
    //console.log(dropProvincia);
    var dropBox2 = document.getElementById("canton");
    console.log(dropBox2.length);
    if (dropBox2.length > 0){
        for (var i = dropBox2.length; i > -1; i--) {
            dropBox2.options.remove(i);
        }
    }
    var dropBox3 = document.getElementById("parroquia");
    if (dropBox3.length > 0){
        for (var i = dropBox3.length; i > -1; i--) {
            dropBox3.options.remove(i);
        }
    }
    cantonesDB = JSON.parse(ipcRenderer.sendSync('dropProvincia', dropProvincia));
    //console.log(cantonesDB);
    for (var key in cantonesDB) {
        dropBox2.options.add(new Option(cantonesDB[key]));
    }
}

function getCanton(){
    var dropBox = document.getElementById("canton");
    var dropCanton = dropBox.options[dropBox.selectedIndex].value;
    //console.log(dropProvincia);
    var dropBox2 = document.getElementById("parroquia");
    console.log(dropBox2.length);
    if (dropBox2.length > 0){
        for (var i = dropBox2.length; i > -1; i--) {
            dropBox2.options.remove(i);
        }
    }
    parroquiasDB = JSON.parse(ipcRenderer.sendSync('dropCanton', dropCanton));
    console.log(parroquiasDB);
    for (var key in parroquiasDB) {
        dropBox2.options.add(new Option(parroquiasDB[key]));
    }
}

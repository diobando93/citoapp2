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
const ciudad = document.getElementById("ciudad");
const sector = document.getElementById("sector");
const instruccion = document.getElementById("instruccion");
const ocupacion = document.getElementById("ocupacion");
const ins_jefefamilia = document.getElementById("ins_jefefamilia");
const ocu_jefefamilia = document.getElementById("ocu_jefefamilia");
const est_toma_muestra  = document.getElementById("est_toma_muestra");
const f_muestra = document.getElementById("f_muestra");
const f_menstruacion = document.getElementById("f_menstruacion");
const metodo_planificacion = document.getElementById("metodo_planificacion");
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

var input = document.getElementById("Cedula");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        console.log(cedula.value);
        event.preventDefault();
        ipcRenderer.send('cedula', cedula.value);
        ipcRenderer.on('provincias', (e,args) =>{
            provinciasDB = JSON.parse(args);
            var dropBox = document.getElementById("provincia");
            for (var key in provinciasDB) {
                dropBox.options.add(new Option(provinciasDB[key]));
            }
        })
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
            document.getElementById('ciudad').style.display = 'block';
            document.getElementById('sector').style.display = 'block';
            document.getElementById('instruccion').style.display = 'block';
            document.getElementById('ocupacion').style.display = 'block';
            document.getElementById('ins_jefefamilia').style.display = 'block';
            document.getElementById('ocu_jefefamilia').style.display = 'block';
            document.getElementById('est_toma_muestra').style.display = 'block';
            document.getElementById('f_muestra').style.display = 'block';
            document.getElementById('f_menstruacion').style.display = 'block';
            document.getElementById('metodo_planificacion').style.display = 'block';
            document.getElementById('embarazo').style.display = 'block';
            document.getElementById('lactancia').style.display = 'block';
        }
    }
});


function pedido_render(){
    datos.push(cedula.value);
    datos.push(h_clinica.value);
    datos.push(establecimiento.value);
    datos.push(nombres.value);
    datos.push(apellidos.value);
    datos.push(edad.value);
    datos.push(f_nacimiento.value);
    datos.push(pais.value);
    datos.push(provincia.value);
    datos.push(canton.value);
    datos.push(parroquia.value);
    datos.push(ciudad.value);
    datos.push(sector.value);
    datos.push(instruccion.value);
    datos.push(ocupacion.value);
    datos.push(ins_jefefamilia.value);
    datos.push(ocu_jefefamilia.value);
    datos.push(est_toma_muestra.value);
    datos.push(f_muestra.value);
    datos.push(f_menstruacion.value);
    datos.push(metodo_planificacion.value);
    datos.push(embarazo.value);
    datos.push(lactancia.value);
    datos.push(destruccion_local.value);
    datos.push(conizacion.value);
    datos.push(histectomia.value);
    datos.push(radioterapia.value);
    datos.push(hormonoterapia.value);
    datos.push(onco_otros.value);
    datos.push(citologiaSi.value);
    datos.push(citologiaNo.value);
    datos.push(NumCitologias.value);
    datos.push(citologiaAnios.value);
    datos.push(citologiaMeses.value);
    console.log(datos)
    ipcRenderer.send('datos', datos);
    datos = [];
};

function getProvincia(){
    var dropBox = document.getElementById("provincia");
    var dropProvincia = dropBox.options[dropBox.selectedIndex].value;
    ipcRenderer.send('dropProvincia', dropProvincia);
    ipcRenderer.on('cantones', (e, args) =>{
        cantonesDB = JSON.parse(args);
        console.log(cantonesDB);
        //var dropBox2 = document.getElementById("canton");
        /*
        for (var key in cantonesDB) {
            dropBox2.options.add(new Option(cantonesDB[key]));
        }
        */
    })
}

function getCanton(){
    console.log('yaff')
}

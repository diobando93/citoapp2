const electron = require('electron');
const {ipcRenderer} = electron;
const cedula = document.querySelector(".col-75 input[name='Cedu']");
const h_clinica = document.querySelector(".col-75 input[name='h_clinica']");
const nombres = document.querySelector(".col-75 input[name='Nombres']");
const apellidos = document.querySelector(".col-75 input[name='Apellidos']");
const edad = document.querySelector(".col-75 input[name='edad']");
const f_nacimiento = document.querySelector(".col-75 input[name='f_nacimiento']");
const pais = document.querySelector(".col-75 input[name='pais']");
const provincia = document.querySelector(".col-75 input[name='provincia']");
const canton = document.querySelector(".col-75 input[name='canton']");
const parroquia = document.querySelector(".col-75 input[name='parroquia']");
const ciudad = document.querySelector(".col-75 input[name='ciudad']");
const direccion = document.querySelector(".col-75 input[name='ciudad']");
const sector = document.querySelector(".col-75 input[name='sector']");
const instruccion = document.querySelector(".col-75 input[name='instruccion']");
const ocupacion = document.querySelector(".col-75 input[name='ocupacion']");
const ins_jefefamilia = document.querySelector(".col-75 input[name='ins_jefefamilia']");
const ocu_jefefamilia = document.querySelector(".col-75 input[name='ocu_jefefamilia']");
const solca  = document.querySelector(".col-75 input[name='solca']");
//let enviar = false;
let datos = [];


var input = document.getElementById("Ced");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        ipcRenderer.send('cedula', cedula.value);
        var x = document.getElementById("Nombre");

        console.log("Entro")

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

        /*else {
            document.getElementById('Nombre').style.display = 'none';
            document.getElementById('edad').style.display = 'none';
            document.getElementById('Apellido').style.display = 'none';
            document.getElementById('f_nacimiento').style.display = 'none';
            document.getElementById('pais').style.display = 'none';
            document.getElementById('provincia').style.display = 'none';
            document.getElementById('canton').style.display = 'none';
            document.getElementById('parroquia').style.display = 'none';
            document.getElementById('ciudad').style.display = 'none';
            document.getElementById('sector').style.display = 'none';
            document.getElementById('instruccion').style.display = 'none';
            document.getElementById('ocupacion').style.display = 'none';
            document.getElementById('ins_jefefamilia').style.display = 'none';
            document.getElementById('ocu_jefefamilia').style.display = 'none';
            document.getElementById('est_toma_muestra').style.display = 'none';
            document.getElementById('f_muestra').style.display = 'none';
            document.getElementById('locu_jefefamilia').style.display = 'none';

        }*/
    }
});


function pedido_render(){
    datos.push(cedula.value);
    datos.push(h_clinica.value);
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
    console.log(datos)
    ipcRenderer.send('datos', datos);
    datos = [];
};


    /*
    for (const prop in aux){
        console.log(aux)
        console.log('boom')
        //console.log(patient.dat_personales.aux)
        //verificacion_vacio(patient.dat_personales["aux"])
    };
    let aux = ''
    const objetos_personales = Object.keys(patient.dat_personales)
    console.log(objetos_personales.length)
    //const p = Object.keys(patient.dat_personales[value])
    console.log(Object.keys(patient.dat_personales))
    //verificacion_vacio(patient.dat_personales);
    console.log(patient.dat_personales.cedula);
    //ipcRenderer.send('save', registro)
    verificacion_vacio(patient.dat_personales.nombres)
    verificacion_vacio(patient.dat_personales.apellido)
    verificacion_vacio(patient.dat_personales.edad)

    */

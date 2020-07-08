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

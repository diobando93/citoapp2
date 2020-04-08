const electron = require('electron');
const {ipcRenderer} = electron;
const cedula = document.querySelector(".col-75 input[name='Cedu']");
//const h_clinica = document.querySelector(".col-75 input[name='']");
const nombres = document.querySelector(".col-75 input[name='Nombres']");
const apellidos = document.querySelector(".col-75 input[name='Apellidos']");
const edad = document.querySelector(".col-75 input[name='edad']");
//const f_nacimiento = document.querySelector(".col-75 input[name='']");
const pais = document.querySelector(".col-75 input[name='pais']");
const provincia = document.querySelector(".col-75 input[name='provincia']");
const canton = document.querySelector(".col-75 input[name='canton']");
const parroquia = document.querySelector(".col-75 input[name='parroquia']");
const ciudad = document.querySelector(".col-75 input[name='ciudad']");
const direccion = document.querySelector(".col-75 input[name='ciudad']");
const sector = document.querySelector(".col-75 input[name='sector']");
//const instruccion = document.querySelector(".col-75 input[name='']");
//const ocupacion = document.querySelector(".col-75 input[name='']");
//const ins_jefefamilia = document.querySelector(".col-75 input[name='']");
//const ocu_jefefamilia = document.querySelector(".col-75 input[name='']");


//funciones
// verficar si el formulario se lleno de forma correcta con los campos obligatorios o no envia
function verificacion_vacio (campo) {
        if (campo === ''){
            alert('No ha completado los campos');
            return;
        } else {
            alert('Datos almecenados')
        };
};
/*
function verificacion_num (campo) {
    if (isNaN(campo)) {
        alert('La cedula no puede tener letras')
        return;
    };else{
        pedido_render();
    };
};
*/
function pedido_render(){
    const patient = {

        dat_personales : {
            cedula:  cedula.value,
            //h_clinica = h_clinica.value,
            nombres:  nombres.value,
            apellidos: apellidos.value,
            edad: edad.value
            //f_nacimiento = f_nacimiento.value,
        },

        domicilio : {
            pais : pais.value,
            provincia : provincia.value,
            canton : canton.value,
            parroquia : parroquia.value,
            ciudad : ciudad.value,
            direccion : direccion.value,
            sector : sector.value
        }
        /*
        estudios = {
            instruccion =  instruccion.value,
            ocupacion = ocupacion.value,
            ins_jefefamilia = ins_jefefamilia.value,
            ocu_jefefamilia = ocu_jefefamilia.value
        }
        */
    };
    verificacion_vacio(patient.dat_personales.cedula)

    /*
    const objetos_personales = Object.keys(patient.dat_personales)
    console.log(objetos_personales.length)
    //const p = Object.keys(patient.dat_personales[value])
    console.log(Object.keys(patient.dat_personales))
    //verificacion_vacio(patient.dat_personales);
    console.log(patient.dat_personales.cedula);
    //ipcRenderer.send('save', registro)
    */
};

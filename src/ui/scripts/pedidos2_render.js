const electron = require("electron");
const { ipcRenderer } = electron;
let cedula = document.getElementById("Cedula");
let h_clinica = document.getElementById("h_clinica");
let pedido = document.getElementById("pedido");
const establecimiento = document.getElementById("establecimiento");
//const medicos = document.getElementById("medicos");
let nombres = document.getElementById("Nombre");
let apellidos = document.getElementById("Apellido");

let edadRender = document.getElementById("edad");
let f_nacimiento = document.getElementById("f_nacimiento");
const pais = document.getElementById("pais");
const provincia = document.getElementById("provincia");
const canton = document.getElementById("canton");
const parroquia = document.getElementById("parroquia");
const sector = document.getElementById("sector");
const instruccion = document.getElementById("instruccion");
const ocupacion = document.getElementById("ocupacion");
const ins_jefefamilia = document.getElementById("ins_jefefamilia");
const ocu_jefefamilia = document.getElementById("ocu_jefefamilia");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const telefonof = document.getElementById("telefonof");
const emailf = " ";
const f_muestra = document.getElementById("f_muestra");
const f_menstruacion = document.getElementById("f_menstruacion");
const metodo_planificacion = document.getElementById("metodo_planificacion");
const num_partos = document.getElementById("num_partos");
const num_cesareas = document.getElementById("num_cesareas");
const num_abortos = document.getElementById("num_abortos");
const edad_vid_sexual = document.getElementById("edad_vid_sexual");

const embarazo = document.getElementById("embarazo");
const lactancia = document.getElementById("lactancia");
const now_niguno = document.getElementById("now_ninguna");

const destruccion_local = document.getElementById("rdDestrlocal");
const conizacion = document.getElementById("rdConizacion");
const histectomia = document.getElementById("rdHistectomia");
const radioterapia = document.getElementById("rdRadioterapia");
const hormonoterapia = document.getElementById("rdHormonoterapia");
const onco_otros = document.getElementById("rdTratamOncol");
const citologiaSi = document.getElementById("rdSi");
const citologiaNo = document.getElementById("rdNo");
const some_ninguno = document.getElementById("rdNinguno");

const NumCitologias = document.getElementById("numCitologias");
const citologiaAnios = document.getElementById("numAnios");
const citologiaMeses = document.getElementById("numMeses");

//let enviar = false;
let datos = [];
var provinciasDB = [];
var cantonesDB = [];
var parroquiasDB = [];
var medicosDB = [];
var numPedido = "";
var hClinica = "";
var cedulaDB = "";
var edadDB = "";

var input = document.getElementById("Cedula");

//bug0: imprimir el codigo de historia clinica
//bug0: listo!
//bug1: imprimir el codigo de pedido
//bug1: listo!
//bug3: cada enter en la parte de la cedula llama de nuevo a la funcion
//bug4: popup para resetear los campos si desea continuar si no regresar al main menu
//bug5: boton para limpiar el formulario noseeee

ipcRenderer.on("cedulaConfirm", (e, args) => {
  console.log(args);
  cedulaDB = args;
  cedula.innerHTML = args;

  //Recibir arreglo de instituciones
  let establecimientosDB = [];

  establecimientosDB = JSON.parse(
    ipcRenderer.sendSync(
      "consulta-establecimientos",
      "consulta-establecimientos"
    )
  );

  //Colocar establecimientos en drop down
  var dropBox = document.getElementById("establecimiento");

  dropBox.options.add(new Option(" "));

  for (var key in establecimientosDB) {
    dropBox.options.add(
      new Option(key.toString() + " - " + establecimientosDB[key].toString())
    );
  }

  //Recibir arreglo de provincias
  provinciasDB = [];
  console.log(cedula.value);
  provinciasDB = JSON.parse(ipcRenderer.sendSync("cedula", args));

  //Colocar provincias en drop down
  var dropBox = document.getElementById("provincia");

  dropBox.options.add(new Option(" "));
  for (var key in provinciasDB) {
    dropBox.options.add(
      new Option(key.toString() + " - " + provinciasDB[key].toString())
    );
  }

  //Recibir y presentar Numero de Pedido
  ipcRenderer.on("numPedido", (e, args) => {
    numPedido = args;
    array = [];
    array = args.split('"');
    pedido.innerHTML = array[1];
    console.log(args);
  });

  //Recibir y Presentar Numero de Historia Clinica
  ipcRenderer.on("hClinica", (e, args) => {
    console.log(args);
    hClinica = args;
    args = args.split("-");
    args = args[0].split('"');
    h_clinica.innerHTML = args[1];
  });
});

function calcularEdad() {
  //console.log(f_nacimiento.value);
  var hoy = new Date();
  var cumple = new Date(f_nacimiento.value);
  var edad = hoy.getFullYear() - cumple.getFullYear();
  var m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  console.log(edad);
  edadDB = edad;
  edadRender.innerHTML = edad;
}

function getProvincia() {
  var dropBox = document.getElementById("provincia");
  var dropProvincia = dropBox.options[dropBox.selectedIndex].value;
  dropProvincia = dropProvincia.substring(dropProvincia.indexOf("-") + 1);
  console.log(dropProvincia);
  var dropBox2 = document.getElementById("canton");
  console.log(dropBox2.length);
  if (dropBox2.length > 0) {
    for (var i = dropBox2.length; i > -1; i--) {
      dropBox2.options.remove(i);
    }
  }
  var dropBox3 = document.getElementById("parroquia");
  dropBox3.options.add(new Option(" "));
  if (dropBox3.length > 0) {
    for (var i = dropBox3.length; i > -1; i--) {
      dropBox3.options.remove(i);
    }
  }
  cantonesDB = JSON.parse(ipcRenderer.sendSync("dropProvincia", dropProvincia));
  //console.log(cantonesDB);
  dropBox2.options.add(new Option(" "));
  for (var key in cantonesDB) {
    dropBox2.options.add(
      new Option(key.toString() + " - " + cantonesDB[key].toString())
    );
  }
}

function getCanton() {
  var dropBox = document.getElementById("canton");
  var dropCanton = dropBox.options[dropBox.selectedIndex].value;
  dropCanton = dropCanton.substring(dropCanton.indexOf("-") + 1);
  //console.log(dropProvincia);
  var dropBox2 = document.getElementById("parroquia");
  //console.log(dropBox2.length);
  if (dropBox2.length > 0) {
    for (var i = dropBox2.length; i > -1; i--) {
      dropBox2.options.remove(i);
    }
  }
  parroquiasDB = JSON.parse(ipcRenderer.sendSync("dropCanton", dropCanton));
  //console.log(parroquiasDB);
  dropBox2.options.add(new Option(" "));
  for (var key in parroquiasDB) {
    dropBox2.options.add(
      new Option(key.toString() + " - " + parroquiasDB[key].toString())
    );
  }
}

function getMedico() {
  //Recibir variable de establecimiento
  var dropBox = document.getElementById("establecimiento");
  var dropEstablecimineto = dropBox.options[dropBox.selectedIndex].value;
  dropEstablecimineto = dropEstablecimineto.substring(
    dropEstablecimineto.indexOf("-") + 2
  );
  console.log(dropEstablecimineto);

  //Limpiar dropdown de Medicos
  var dropBox2 = document.getElementById("medicos");
  if (dropBox2.length > 0) {
    for (var i = dropBox2.length; i > -1; i--) {
      dropBox2.options.remove(i);
    }
  }

  //Buscar Medicos de establecimiento
  medicosDB = JSON.parse(
    ipcRenderer.sendSync("dropMedicos", dropEstablecimineto)
  );
  console.log(medicosDB);

  //Colocar medicos en dropdown
  for (var key in medicosDB) {
    dropBox2.options.add(
      new Option(key.toString() + " - " + medicosDB[key].toString())
    );
  }
}

function pedido_render() {
  datos.push(cedulaDB);
  datos.push(hClinica);
  datos.push(establecimiento.value);
  datos.push(nombres.value);
  datos.push(apellidos.value);
  datos.push(edadDB);
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
  datos.push(telefono.value);
  datos.push(email.value);
  datos.push(telefonof.value);
  datos.push(emailf);
  datos.push(f_muestra.value);
  datos.push(f_menstruacion.value);
  datos.push(metodo_planificacion.value);
  datos.push(num_partos.value);
  datos.push(num_abortos.value);
  datos.push(edad_vid_sexual.value);

  datos.push(embarazo.checked);
  datos.push(lactancia.checked);
  datos.push(destruccion_local.checked);
  datos.push(conizacion.checked);
  datos.push(histectomia.checked);
  datos.push(radioterapia.checked);
  datos.push(hormonoterapia.checked);
  datos.push(onco_otros.checked);
  datos.push(citologiaSi.checked);
  datos.push(citologiaNo.checked);

  datos.push(NumCitologias.value);
  datos.push(citologiaAnios.value);
  datos.push(citologiaMeses.value);
  datos.push(numPedido);
  var dropBox = document.getElementById("medicos");
  var dropMedicos = dropBox.options[dropBox.selectedIndex].value;
  dropMedicos = dropMedicos.substring(dropMedicos.indexOf("-") + 1);
  datos.push(dropMedicos);
  datos.push(num_cesareas.value);
  datos.push(now_niguno.checked);
  datos.push(some_ninguno.checked);

  console.log(datos);
  ipcRenderer.send("datos", datos);
  datos = [];
}

function guardarcerrar() {
  console.log("CERRAR");
  pedido_render();
  //limpiar();
  //ipcRenderer.send("regresar-pedidos", "regresar-pedidos");
  //window.location.replace("main.html");
}

function cerrarPedidos() {
  limpiar();
  ipcRenderer.send("regresar-pedidos", "regresar-pedidos");
}

function limpiar() {
  console.log("LLAMADO LIMPIAR");
  //document.getElementById("Cedula").value = "";
  document.getElementById("Nombre").value = "";

  document.getElementById("h_clinica").value = "";
  document.getElementById("h_clinica").style.display = "none";
  document.getElementById("pedido").value = "";
  document.getElementById("pedido").style.display = "none";

  document.getElementById("establecimiento").value = "";
  document.getElementById("establecimiento").style.display = "none";
  document.getElementById("medicos").value = "";
  document.getElementById("medicos").style.display = "none";
  document.getElementById("Nombre").value = "";
  document.getElementById("Nombre").style.display = "none";
  document.getElementById("Apellido").value = "";
  document.getElementById("Apellido").style.display = "none";
  document.getElementById("edad").value = "";
  document.getElementById("edad").style.display = "none";
  document.getElementById("f_nacimiento").value = "20202/01/01";

  document.getElementById("pais").value = "";
  document.getElementById("pais").style.display = "none";
  document.getElementById("provincia").value = "";
  document.getElementById("provincia").style.display = "none";
  document.getElementById("canton").value = "";
  document.getElementById("canton").style.display = "none";
  document.getElementById("parroquia").value = "";
  document.getElementById("parroquia").style.display = "none";
  document.getElementById("sector").value = "";
  document.getElementById("sector").style.display = "none";
  document.getElementById("instruccion").value = "";
  document.getElementById("instruccion").style.display = "none";
  document.getElementById("ocupacion").value = "";
  document.getElementById("ocupacion").style.display = "none";
  document.getElementById("ins_jefefamilia").value = "";
  document.getElementById("ins_jefefamilia").style.display = "none";
  document.getElementById("ocu_jefefamilia").value = "";
  document.getElementById("ocu_jefefamilia").style.display = "none";
  document.getElementById("telefono").value = "";
  document.getElementById("telefono").style.display = "none";
  document.getElementById("email").value = "";
  document.getElementById("email").style.display = "none";
  document.getElementById("telefonof").value = "";
  document.getElementById("telefonof").style.display = "none";
  //document.getElementById("emailf").value = "";
  //document.getElementById("emailf").style.display = "none";
  document.getElementById("f_muestra").value = "20202/01/01";

  document.getElementById("f_menstruacion").value = "20202/01/01";

  document.getElementById("metodo_planificacion").value = "";
  document.getElementById("metodo_planificacion").style.display = "none";

  document.getElementById("num_partos").style.display = "none";
  document.getElementById("num_cesareas").style.display = "none";
  document.getElementById("num_abortos").style.display = "none";
  document.getElementById("edad_vid_sexual").style.display = "none";

  document.getElementById("dat1").style.display = "none";
  document.getElementById("dat2").style.display = "none";
  document.getElementById("dat3").style.display = "none";
  //
}
/*
//Lisener en cmapo de c�dula para empezar la pantalla de pedidos
input.addEventListener("keyup", function (event) {
  //Si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    event.preventDefault();

   
    var x = document.getElementById("Nombre");
    if (x.style.display === "none") {
      document.getElementById("h_clinica").style.display = "block";
      document.getElementById("pedido").style.display = "block";
      document.getElementById("establecimiento").style.display = "block";
      document.getElementById("medicos").style.display = "block";
      document.getElementById("Nombre").style.display = "block";
      document.getElementById("edad").style.display = "block";
      document.getElementById("Apellido").style.display = "block";
      document.getElementById("f_nacimiento").style.display = "block";
      document.getElementById("pais").style.display = "block";
      document.getElementById("provincia").style.display = "block";
      document.getElementById("canton").style.display = "block";
      document.getElementById("parroquia").style.display = "block";
      document.getElementById("sector").style.display = "block";
      document.getElementById("instruccion").style.display = "block";
      document.getElementById("ocupacion").style.display = "block";
      document.getElementById("ins_jefefamilia").style.display = "block";
      document.getElementById("ocu_jefefamilia").style.display = "block";
      document.getElementById("telefono").style.display = "block";
      document.getElementById("email").style.display = "block";
      document.getElementById("telefonof").style.display = "block";
      document.getElementById("emailf").style.display = "block";
      document.getElementById("f_muestra").style.display = "block";
      document.getElementById("f_menstruacion").style.display = "block";
      document.getElementById("metodo_planificacion").style.display = "block";
      document.getElementById("dat1").style.display = "block";
      document.getElementById("dat2").style.display = "block";
      document.getElementById("dat3").style.display = "block";
      document.getElementById("num_partos").style.display = "block";
      document.getElementById("num_cesareas").style.display = "block";
      document.getElementById("num_abortos").style.display = "block";
      document.getElementById("edad_vid_sexual").style.display = "block";
    }
  }
});






function guardarcontinuar() {
  console.log("Guardar continuar");
  pedido_render();
  limpiar();
}

function cerrarPedidos() {
  limpiar();
  ipcRenderer.send("regresar-pedidos", "regresar-pedidos");
  //window.close('pedidos.html');
  // window.open('main.html');
  //console.log("cerrar");
  //window.location.replace("main.html");
}

/*
function confirm() {
  var popup = document.getElementById("myForm");
  popup.classList.toggle("show");
}

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

*/

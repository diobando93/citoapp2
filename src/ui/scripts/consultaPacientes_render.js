const electron = require("electron");
const { ipcRenderer } = electron;

let table = document.getElementById("myTable");

function actualizar_tabla(par0, par1, par2, par3) {
  for (var i in par0) {
    var row = table.insertRow();
    row.classList.add("w3-hover-table");
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = parseInt(i) + 1;
    cell2.innerHTML = par0[i];
    cell3.innerHTML = par1[i];
    cell4.innerHTML = par2[i];
    cell5.innerHTML = par3[i];
  }
}

function pacientes_consulta() {
  document.getElementById("botonesBusqueda").style.display = "none";

  //Recibir arreglo de establecimientos
  let pacientesDB = [];
  let nombresTabla = [];
  let apellidosTabla = [];
  let cedulaTabla = [];
  let hclinicaTabla = [];

  pacientesDB = JSON.parse(
    ipcRenderer.sendSync("consulta-pacientes", "consulta-pacientes")
  );
  console.log(pacientesDB);
  for (var key in pacientesDB) {
    nombresTabla.push(pacientesDB[key].nombres);
    apellidosTabla.push(pacientesDB[key].apellidos);
    cedulaTabla.push(pacientesDB[key].cedula);
    hclinicaTabla.push(pacientesDB[key].h_clinica);
  }

  actualizar_tabla(nombresTabla, apellidosTabla, cedulaTabla, hclinicaTabla);
}

function exitPacientes() {
  ipcRenderer.send("regresar-pacientes", "regresar-pacientes");
}

function buscarPacientes() {
  var input, filter, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();

  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

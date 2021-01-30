const electron = require("electron");
const { ipcRenderer } = electron;

let table = document.getElementById("myTable");

function informes_consulta() {
  document.getElementById("botonesBusqueda").style.display = "none";
  //ipcRenderer.send("hola", "bella");

  let informesDB = [];
  let cedulaTabla = [];
  let pedidoTabla = [];
  let hclinicaTabla = [];
  let fechaTabla = [];

  informesDB = JSON.parse(
    ipcRenderer.sendSync("consulta-informes", "consulta-informes")
  );
  for (var key in informesDB) {
    cedulaTabla.push(informesDB[key].cedula);
    pedidoTabla.push(informesDB[key].pedido);
    hclinicaTabla.push(informesDB[key].h_clinica);
    fechaTabla.push(informesDB[key].fecha);
  }
  actualizarTabla(cedulaTabla, pedidoTabla, hclinicaTabla, fechaTabla);
  console.log(informesDB);
}

function actualizarTabla(par0, par1, par2, par3) {
  for (var i in par0) {
    var row = table.insertRow(i);
    row.classList.add("w3-hover-table");
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = i;
    cell2.innerHTML = par0[i];
    cell3.innerHTML = par1[i];
    cell4.innerHTML = par2[i];
    cell5.innerHTML = par3[i];
  }
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].addEventListener("click", function () {
      console.log("vamos a beber");
    });
  }
}

function buscarInformes() {
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

function exitInformes() {
  ipcRenderer.send("regresar-informes", "regresar-informes");
}

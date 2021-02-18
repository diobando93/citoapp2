const electron = require("electron");
const { ipcRenderer } = electron;
const { BrowserWindow } = require("electron").remote;
const PDFWindow = require("electron-pdf-window");

let table = document.getElementById("myTable");
let cedula = "";
let nPedido = "";
let nombrePDF = "";

function informes_consulta() {
  document.getElementById("botonesBusqueda").style.display = "none";
  let informesDB = [];
  let cedulaTabla = [];
  let pedidoTabla = [];
  let hclinicaTabla = [];
  let nombreTabla = [];
  let apellidoTabla = [];

  informesDB = JSON.parse(
    ipcRenderer.sendSync("consulta-informes", "consulta-informes")
  );
  for (var key in informesDB) {
    cedulaTabla.push(informesDB[key].cedula);
    pedidoTabla.push(informesDB[key].pedido);
    hclinicaTabla.push(informesDB[key].h_clinica);
    nombreTabla.push(informesDB[key].nombres);
    apellidoTabla.push(informesDB[key].apellidos);
  }

  actualizarTabla(
    cedulaTabla,
    pedidoTabla,
    hclinicaTabla,
    nombreTabla,
    apellidoTabla
  );
  console.log(informesDB);
}

function actualizarTabla(cedulaT, pedidoT, hclinicaT, nombreT, apellidoT) {
  for (var i in cedulaT) {
    var row = table.insertRow();
    row.classList.add("w3-hover-table");
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    //var cell7 = row.insertCell(6);

    cell1.innerHTML = parseInt(i) + 1;
    cell2.innerHTML = cedulaT[i];
    cell3.innerHTML = nombreT[i];
    cell4.innerHTML = apellidoT[i];
    cell5.innerHTML = hclinicaT[i];
    cell6.innerHTML = pedidoT[i];
    //cell7.innerHTML = fechaT[i];
  }

  // seleccionar el paciente para que se abra su resultado en formato PDF
  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].addEventListener("click", function () {
      cedula = this.cells[1].innerHTML;
      console.log(cedula);
      nPedido = this.cells[5].innerHTML;
      console.log(nPedido);
      nombrePDF = cedula + "_" + nPedido;
      console.log(nombrePDF);
      abrirPDF(nombrePDF);
    });
  }
}

function abrirPDF(nombreArchivo) {
  const win = new BrowserWindow({ width: 800, height: 600 });
  PDFWindow.addSupport(win);
  win.loadURL(
    "file:/home/israel/Desktop/development/Electron/citoapp2/" +
      nombreArchivo +
      ".pdf"
  );
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

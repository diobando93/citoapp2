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

  // seleccionar el paciente para que se abra su resultado en formato PDF
  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].addEventListener("click", function () {
      cedula = this.cells[1].innerHTML;
      console.log(cedula);
      nPedido = this.cells[2].innerHTML;
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

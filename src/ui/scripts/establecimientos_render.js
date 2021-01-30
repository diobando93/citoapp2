const electron = require("electron");
const { ipcRenderer } = electron;

let table = document.getElementById("myTable");

function limpiar_tabla(listaEstablecimientos) {
  for (var del in listaEstablecimientos) {
    document.getElementById("myTable").deleteRow(1);
  }
}

function actualizar_tabla(listaEstablecimientos) {
  for (var i in listaEstablecimientos) {
    var row = table.insertRow();
    row.classList.add("w3-hover-table");
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = parseInt(i) + 1;
    cell2.innerHTML = listaEstablecimientos[i];
  }

  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].addEventListener("click", function () {
      //rIndex = this.rowIndex;
      //alert(this.cells[1].innerHTML);
      let nombre = this.cells[1].innerHTML;
      //document.getElementById("fname").value = this.cells[0].innerHTML;
      //document.getElementById("lname").value = this.cells[1].innerHTML;
      //document.getElementById("age").value = this.cells[2].innerHTML;
      if (confirm("Borrar Registro?" + " " + this.cells[1].innerHTML)) {
        txt = "You pressed OK!";

        for (var i = 1; i < table.rows.length; i++) {
          table.rows[i].removeEventListener("click", function () {});
        }

        let establecimientosDB = [];
        establecimientosDB = JSON.parse(
          ipcRenderer.sendSync(
            "consulta-establecimientos",
            "consulta-establecimientos"
          )
        );

        //limpiar tabla
        limpiar_tabla(establecimientosDB);

        ipcRenderer.send("delete-establecimiento", nombre);

        location.reload();

        //Obtener registros de establecimientos
        //establecimientosDB = JSON.parse(ipcRenderer.sendSync("consulta-establecimientos", "consulta-establecimientos"));

        //Actualizar tabla
        //actualizar_tabla(establecimientosDB);
      } else {
        txt = "You pressed Cancel!";
      }
    });
  }
}

function add_render() {
  let establecimientosDB = [];
  establecimientosDB = JSON.parse(
    ipcRenderer.sendSync(
      "consulta-establecimientos",
      "consulta-establecimientos"
    )
  );

  //limpiar tabla
  limpiar_tabla(establecimientosDB);

  //A�adir registro en BD
  let nombre = document.getElementById("nuevoEstab").value;
  ipcRenderer.send("add-establecimientos", nombre);

  //Obtener registros de establecimientos
  establecimientosDB = JSON.parse(
    ipcRenderer.sendSync(
      "consulta-establecimientos",
      "consulta-establecimientos"
    )
  );

  //Actualizar tabla
  actualizar_tabla(establecimientosDB);
}

function establecimientos_render() {
  document.getElementById("botonesBusqueda").style.display = "none";

  //Recibir arreglo de establecimientos
  let establecimientosDB = [];

  establecimientosDB = JSON.parse(
    ipcRenderer.sendSync(
      "consulta-establecimientos",
      "consulta-establecimientos"
    )
  );
  //console.log(establecimientosDB);

  actualizar_tabla(establecimientosDB);
}

function exitEstablecimientos() {
  ipcRenderer.send("regresar-establecimientos", "regresar-establecimientos");
}

function buscarEstablecimiento() {
  var input, filter, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();

  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
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

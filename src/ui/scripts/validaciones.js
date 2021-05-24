const validaciones = {};

function verificarVacio(datos) {
  let cont = 0;
  let aux = "";
  let envia = true;
  n = datos.length;
  for (var i = 0; i <= n - 1; i++) {
    aux = datos[i];
    if (aux === "") {
      cont = cont + 1;
    }
  }
  if (cont > 0) {
    envia = false;
  }
  return envia;
}

function verificarNumero(datos) {
  let cont = 0;
  let aux = "";
  let envia = true;
  n = datos.length;
  for (var i = 0; i <= n - 1; i++) {
    aux = datos[i];
    if (isNaN(aux)) {
      cont = cont + 1;
    }
  }
  if (cont > 0) {
    envia = false;
  }
  return envia;
}

function verificarDiez(datos) {
  n = datos.length;
  let envia = true;
  console.log(n);
  envia = verificarNumero(datos);
  if (n == 10 && envia == true) {
    return envia;
  } else {
    envia = false;
    return envia;
  }
}

validaciones.verificarNumero = verificarNumero;
validaciones.verificarVacio = verificarVacio;
validaciones.verificarDiez = verificarDiez;
module.exports = validaciones;

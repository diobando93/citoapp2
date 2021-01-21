const { model, Schema } = require("mongoose");

const Resultados = new Schema({
  h_clinica: String,
  cedula: String,
  pedido: String,
  aspecto_cuello: String,
  observaciones: String,
  responsable: String,
  noplacas: String,
  madecuada: String,
  minadecuada: String,
  frotis: String,

  germenes: {
    floraBarcilar: String,
    floraCocoide: String,
    vaginosisBacteriana: String,
    candida: String,
    leptotrix: String,
    actnomyces: String,
    triconomas: String,
    citolisis: String,
    herpes: String,
    hpv: String,
    histocitos: String,
    exudado: String,
    otros: String,
  },

  celulas: {
    endocervicales: String,
    metaplasticas: String,
    endometriales: String,
  },

  result_toma: {
    diagnostico: String,
    celulasParabasales: String,
    celulasIntermedias: String,
    celulasSuperficiales: String,
    control: String,
    observaciones: String,
  },
});

module.exports = model("Results", Resultados);

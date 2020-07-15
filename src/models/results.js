const { model, Schema } = require('mongoose')

const Resultados = new Schema ({
    h_clinica: String,
    cedula: String,
    aspecto_cuello: String,
    observaciones: String,
    germenes: String,
    celulas: String,
    frotis: String,
    result_toma: String,
    celulas: String,
    diagnostico: String
})

module.exports = model('Results', Resultados);

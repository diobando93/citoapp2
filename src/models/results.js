const { model, Schema } = require('mongoose')

const Resultados = new Schema ({
    h_clinica: String,
    cedula: String,
    pedido: String,
    aspecto_cuello: String,
    observaciones: String,
    responsable: String,
    noplacas: String,
    madecuada: String,
    minadecuada: String,
    minforme: String,
    frotis: String,
    fnoprocesada: String,
    germenes: {
        floraBarcilar: String,
        floraCocoide: String,
        vaginosisBacteriana: String,
        triconomas: String,
        actnomyces: String,
        candida: String,
        herpes: String,
        hpv: String,
        otros: String
    },
    celulas: {
        endocervicales: String,
        metaplasticas: String,
        endometriales: String
    },
    result_toma: {
        diagnostico: String,
        recomendacion: String,
        observaciones: String,
        citotecnologo: String,
        citopatologo: String
    }

})

module.exports = model('Results', Resultados);

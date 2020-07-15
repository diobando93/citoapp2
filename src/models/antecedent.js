const { model, Schema } = require('mongoose')

const Antecedente = new Schema ({
    cedula: String,
    h_clinica: String,
    establecimiento: String,
    fecha_ult_mestruacion: Date,
    num_partos: String,
    embarazada: Boolean,
    num_abortos: String,
    lactancia: Boolean,
    inicio_sexo: String,
    destruccion_local: String,
    conizacon: Boolean,
    histereclomia: Boolean,
    radioterapia: Boolean,
    holmonoterapia: Boolean,
    otros: String,
    citologia: {
        realizado: Boolean,
        numero: String,
        tiempo: String
    }
})


module.exports = model('Antecedent', Antecedente);

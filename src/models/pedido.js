const { model, Schema } = require('mongoose')

const Pedido = new Schema ({
    cedula: String,
    h_clinica: String,
    pedido: String,
    edad: String,
    ubicacion: {
        pais: String,
        provincia: String,
        canton: String,
        parroquia: String,
        sector: String,
    },
    estudios: {
        instruccion: String,
        ocupacion: String,
        ins_jefefamilia: String,
        ocu_jefefamilia: String
    },
    establecimiento: String,
    f_muestra: Date,
    fecha_ult_mestruacion: Date,
    metodo_planificacion: String,
    num_partos: String,
    num_abortos: String,
    inicio_sexo: String,
    embarazada: Boolean,
    lactancia: Boolean,
    destruccion_local: Boolean,
    conizacon: Boolean,
    histectomia: Boolean,
    radioterapia: Boolean,
    hormonoterapia: Boolean,
    otros: Boolean,
    citologia: {
        Si: Boolean,
        No: Boolean,
        numero: String,
        anios: String,
        meses: String
    }
})


module.exports = model('Pedido', Pedido);

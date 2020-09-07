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
    embarazada: String,
    lactancia: String,
    destruccion_local: String,
    conizacon: String,
    histectomia: String,
    radioterapia: String,
    hormonoterapia: String,
    otros: String,
    citologia: {
        Si: String,
        No: String,
        numero: String,
        anios: String,
        meses: String
    }
})


module.exports = model('Pedido', Pedido);

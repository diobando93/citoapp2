const { model, Schema } = require('mongoose')

const newPatient = new Schema ({
    dat_personales: {
        cedula: String,
        h_clinica: String,
        apellidos: String,
        nombres: String,
        f_nacimiento: date(),
        edad: String
    },    
    domicilio: {
        pais: String,
        provincia: String,
        canton: String,
        parroquia: String,
        ciudad: String,
        barrio: String,
        direccion: String,
        sector: String
    },
    estudios: {
        instruccion: String,
        ocupacion: String,
        ins_jefefamilia: String,
        ocu_jefefamilia: String
    }
})
/*
const newAntecedent = new Schema ({
    establecimiento:
    fecha_toma:
    fecha_ult_mestruacion:
    fecha_ing_solca:
    num_partos:
    embarazada:
    num_abortos:
    lactancia:
    inicio_sexo:
    destruccion_local:
    conizacon:
    histereclomia:
    radioterapia:
    holmonoterapia:
    otros:
    citologia:
    numero:
    tiempo:
})

const newSample = new Schema({
    aspecto_cuello:
    observaciones:
    res_toma:
    frotis:
    germenes:
    celulas:
    diagnostico:
    observaciones:
})

const newResult = new Schema ({
    diagnostico:
    recomendacion:
    observaciones:
    citotecnologo:
    citopatologo:
})
*/
models.exports = model('Patient', newPatient)

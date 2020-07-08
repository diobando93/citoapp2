const { model, Schema } = require('mongoose')

const Patient = new Schema ({
    h_clinica: String,
    cedula: String,
    apellidos: String,
    nombres: String,
    f_nacimiento: Date,
});

const DatPatient = new Schema ({
    h_clinica: String,
    cedula: String,
    f_creacion: Date,
    solca: Boolean,
    edad: String
});

const AddrPatient = new Schema ({
    cedula: String,
    h_clinica: String,
    pais: String,
    provincia: String,
    canton: String,
    parroquia: String,
    ciudad: String,
    barrio: String,
    direccion: String,
    sector: String,
    instruccion: String,
    ocupacion: String,
    ins_jefefamilia: String,
    ocu_jefefamilia: String
});





module.exports = model('Patient', Patient);
module.exports = model('DatPatient', DatPatient);
module.exports = model('AddrPatient', AddrPatient);



/*
module.exports = model('Sample', Sample);
const Antecedent = new Schema ({
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
});

const Sample = new Schema({
    cedula: String,
    h_clinica: String,
    fecha_toma: Date,
    fecha_ing_solca: Date,
    establecimiento: String,
});
no_placas: String,
valoracion_muestra: {
    adecuada: Boolean,
    inadecuada: Boolean,
    informar: String
}
aspecto_cuello: {

    observaciones: String,
}
frotis:{

}
germenes: {

}
celulas: {

}
diagnostico: {
    recomendacion:
    observaciones:
    citotecnologo:
    citopatologo:
}
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

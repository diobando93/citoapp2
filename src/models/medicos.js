const { model, Schema } = require('mongoose')

const Medicos = new Schema ({
    nombre: String,
    apellido: String,
    institucion: String
})

module.exports = model('Medico', Medicos);

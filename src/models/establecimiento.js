const { model, Schema } = require('mongoose');

const Establecimiento = new Schema({
    Nombre: String
})

module.exports = model('Establecimiento', Establecimiento);

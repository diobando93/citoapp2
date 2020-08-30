const { model, Schema } = require('mongoose');
const pedidocounter = new Schema ({
    pedido_counter: String
})
module.exports = model ('pedidocounter', pedidocounter);

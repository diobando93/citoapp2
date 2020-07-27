const { model, Schema } = require('mongoose');
const hclinica = new Schema ({
    h_clinica: String
})
module.exports = model ('hclinic', hclinica);

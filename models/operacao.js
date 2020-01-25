const { Schema, model } = require('mongoose')

const opSchema = new Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('operacoes', opSchema)
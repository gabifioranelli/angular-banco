const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunosSchema = new Schema({
    nome: String,
    sala: String,
    idade: Number,
    identificacao: String,
    responsavel: String

});

module.exports = mongoose.model('alunos', AlunosSchema)
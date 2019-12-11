import { User } from "../enum/user";

const mongo = require('mongoose');

const schemaUser = new mongo.Schema({
    nome: String, 
    email: String,
    telefone: { type: String, default: '' },
    foto: { type: String, default: '' },
    ativo: { type: Boolean, default: true },
    numero: { type: Number, default: null },
    rating: { type: Number, default: 0 },
    valorhora: { type: Number, default: 0 },
    observacao: { type: String, default: '', },
    localizacao: { type: Array, default: [] },
    placaVeiculo: { type: String, default: null },
    marcaVeiculo: { type: String, default: null },
    horarioFuncionamento: { type: String, default: '' },
    perfil: { type: Number, default: User.Client, },
    password: { type: String, default: '', },
    dataCriacao: { type: Date, default: Date.now, },
});

module.exports = mongo.model('User', schemaUser);
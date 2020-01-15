import { User } from '../enum/user'

const mongo = require('mongoose')
const Schema = mongo.Schema

const schemaUser = new mongo.Schema({
  nome: String,
  email: String,
  telefone: { type: String, default: '' },
  foto: { type: Buffer, default: '' },
  ativo: { type: Boolean, default: true },
  numero: { type: Number, default: null },
  valorhora: { type: Number, default: 0 },
  observacao: { type: String, default: '' },
  endereco: { type: String, default: '' },
  localizacao: { type: Array, default: [] },
  placaVeiculo: { type: String, default: null },
  marcaVeiculo: { type: String, default: null },
  horarioFuncionamento: { type: String, default: '' },
  perfil: { type: Number, default: User.Client },
  password: { type: String, default: '' },
  vagas: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  dataCriacao: { type: Date, default: Date.now }
})

module.exports = mongo.model('User', schemaUser)

import { VacancyStatus } from '../enum/vacancy'

const User = require('../models/User')
const mongo = require('mongoose')

const SchemaUserVacancy = new mongo.Schema({
  _id: { type: mongo.Schema.Types.ObjectId, ref: 'users' },
  email: String,
  nome: String,
  placaVeiculo: String,
  marcaVeiculo: String,
  foto: String,
  telefone: String
})

const schemaVacancy = new mongo.Schema({
  observacao: { type: String, default: '' },
  status: { type: Number, default: VacancyStatus.Scheduled, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  establishment: { type: mongo.Schema.Types.ObjectId },
  client: SchemaUserVacancy,
  valor: { type: Number, required: true }
})

module.exports = mongo.model('vacancies', schemaVacancy)

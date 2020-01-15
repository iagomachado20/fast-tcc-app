import { VacancyStatus } from '../enum/vacancy'

const mongo = require('mongoose')
const Schema = mongo.Schema

const schemaVacancy = new mongo.Schema({
  observacao: { type: String, default: '' },
  status: { type: Number, default: VacancyStatus.Released, required: true },
  checkIn: { type: Date, default: Date.now(), required: true },
  checkOut: { type: Date, default: Date.now(), required: true },
  establishment: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  valor: { type: Number, required: true }
})

module.exports = mongo.model('registerVacancy', schemaVacancy)

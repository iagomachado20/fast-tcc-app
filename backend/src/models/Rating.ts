const mongo = require('mongoose')
const Schema = mongo.Schema

const schemaRating = new mongo.Schema({
  estabelecimentoId: { type: Schema.Types.ObjectId, ref: 'User' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true }
})

module.exports = mongo.model('Rating', schemaRating)

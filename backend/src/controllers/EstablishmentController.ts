import { User as enumUser } from '../enum/user'
const User = require('../models/User')
const Rating = require('../models/Rating')

const self = module.exports = {

  async getEstablishments (req, res) {
    const { name } = req.params

    const queryName = {
      nome: { $regex: name, $options: 'i' }
    }

    let objQuery = {
      perfil: enumUser.Establishment
    }

    if (name) {
      objQuery = { ...queryName, ...objQuery }
    }

    const allEstablishments = await User.find(objQuery)

    await Promise.all(allEstablishments.map(async (establishment) => {
      let rating = 0

      await self.getRating(establishment).then(result => {
        rating = Math.round(result[0].rating)
      })

      establishment.rating = rating
      return establishment
    }))

    try {
      if (allEstablishments.length > 0) {
        return res.status(200).send({
          data: allEstablishments,
          success: true
        })
      } else {
        return res.status(200).send({
          data: [],
          success: true
        })
      }
    } catch (e) {
      return res.status(400).send({
        data: [],
        success: false
      })
    }
  },

  async getRating (establishment) {
    return Rating.aggregate(
      [
        { $match: { estabelecimentoId: establishment._id } },
        {
          $group: {
            _id: '$estabelecimentoId',
            rating: {
              $avg: '$rating'
            }
          }
        }
      ]
    ).exec()
  },

  async changeStatus (req, res) {
    const { userId } = req
    const { ativo } = req.body
    const query = {
      perfil: enumUser.Establishment,
      _id: userId
    }

    if (ativo === null || ativo === undefined) {
      res.status(400).send({
        message: 'Status precisa ser informado',
        success: false
      })
    }

    await User.findOneAndUpdate(query, { ativo: ativo }, { upsert: true }, function (err, doc) {
      if (err) return res.send(500, { error: err })
      return res.send({
        message: `O estabelecimento agora está ${JSON.parse(ativo) ? 'aberto' : 'fechado'}`,
        success: true
      })
    })
  }

}

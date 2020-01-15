const Rating = require('../models/Rating')

module.exports = {

  async setRatingEstablishment (req, res) {
    const { userId } = req
    const { rating, estabelecimentoId } = req.body

    if (!rating) {
      return res.status(400).send({
        message: 'Rating não fornecido',
        success: false
      })
    }

    await Rating.create({
      estabelecimentoId: estabelecimentoId,
      rating: rating,
      userId: userId
    }).then(response => {
      return res.json({
        message: 'Sua avaliação foi enviada com sucesso!',
        type: 'success'
      })
    }, error => {
      return res.status(400).send({
        message: error,
        type: 'danger'
      })
    })
  }

}

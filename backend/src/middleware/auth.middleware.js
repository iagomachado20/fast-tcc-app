const jwt = require('jsonwebtoken')
require('dotenv-safe/config')

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token precisa ser fornecido'
    })
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) res.status(401).send({ message: 'Token inválido' })
      req.userId = decoded.id
      next()
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}

module.exports = {
  checkToken: checkToken
}

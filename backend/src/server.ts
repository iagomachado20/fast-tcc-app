
// Express e Mongosse
const express = require('express')
const mongoose = require('mongoose')
const time = require('time')
const routers = require('./routes')
const cors = require('cors')

// TimeZone Aplication
const now = new time.Date()
now.setTimezone('UTC')

// Aplication Express
const app = express()

// Modules e Utils
const Util = require('./utils/utils')

const port: number = Util.normalizePort(process.env.PORT || 3001)

mongoose.connect('mongodb://localhost/fastparking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
app.use(express.json())
app.use(cors())
app.use(routers)

// Start Server in Port
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))

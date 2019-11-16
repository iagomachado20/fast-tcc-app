// Express e Mongosse
const express = require('express');
const mongoose = require('mongoose');

// Aplication Express
const app = express();

// Modules e Utils
const Util = require('./utils/utils');
const db = require('./config/database.ts');

const port: number = Util.normalizePort(process.env.PORT || 3000);

mongoose.connect(db.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {

    return res.send('Olá Iago Machado');

});

app.use(express.json());

// Start Server in Port
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
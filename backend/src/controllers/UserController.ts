const User = require('../models/User');

module.exports = {

    async consult(req, res) {

        const users = await User.find({}).sort('dateCreate');

        return res.json(users);

    },

    async insert (req, res) {
        const users = await User.create(req.body);
        return res.json(users);
    }

};
const User = require('../models/User');
const authService = require('../services/auth.service');
const AuthService = new authService();
let jwt = require('jsonwebtoken');

module.exports = {

    async login(req, res) {

        if (!req.body.email && !req.body.password) {
            return res.status(400).send(
                { message: 'E-mail e senha precisam ser preenchidos!'}
            );
        }

        const isValidUser: boolean = await module.exports.isUserCredentialsValid(req.body);

        if (isValidUser) {

            const user = await User.findOne({ email: req.body.email });
            const id = user._id;

            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: '24h'
            });

            res.status(200).send({ token: token });

        } else {
            res.status(403).send({
                message: 'E-mail ou senha inválidos.'
            });
        }

    },

    async checkEmailExist(emailUser: string) {
        try {
            const result = await User.find({ email: emailUser });
            return result.length > 0;
        } catch(e) {
            return e;
        }
    },

    async isUserCredentialsValid(credentials: { email: string, password: string }) {

        const user = await User.findOne({
            email: credentials.email
        });

        if (user && credentials.password && credentials.email) {

            return credentials.email === user.email
            && AuthService.comparePassword(credentials.password, user.password);

        };

    },

    async insert(req, res) {
        
        const emailIsExist: boolean = await module.exports.checkEmailExist(req.body.email);
        
        if (emailIsExist) {
            return res.status(400).send({ message: 'E-mail já utilizado na plataforma.'});
        } 

        // Encripta a senha do usuário para o padrão salt
        req.body.password = AuthService.cryptPassword(req.body.password);

        await User.create(req.body)
        .then(response => {
            return res.json({message: 'Acesso criado com sucesso!'});
        }, error => {
            return res.status(400).send({message: error});
        });
    },

    async dataUserLogged(req, res, next) {

        const user = await User.findOne({
            _id: req.userId
        });

        try {

            return res.status(200).send({
                data: user,
                success: true
            });
            
        } catch (e) {
            return res.status(400).send({
                data: [],
                message: 'Não foi possível carregar os dados do usuário.',
                success: false
            });
        }
        

    }

};
class AuthServiceClass {

    public cryptPassword(password: string) {

        const bcrypt = require('bcrypt');
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);

    }

    public comparePassword(password: string, hash): boolean {
        
        const bcrypt = require('bcrypt');
        return bcrypt.compareSync(password, hash);

    }

}

module.exports = AuthServiceClass;
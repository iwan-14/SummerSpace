const userModel = require('../model/user')
const bcrypt = require('bcrypt');
const { create } = require('../model/user');

class User {
    constructor() {}
    serveLogin(req, res) {
        res.render('sign-in')
    }

    serveRegister(req, res) {
        res.render('register')
    }

    async postUser(req, res) {
        const password = req.body.password
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)
        req.body.password = hashedPassword
        try {
            await userModel.create(req.body)
            res.redirect('/user/sign-in')
        }
        catch(err) {
            console.log(err, 'create error')
        }
    }

    async login(req, res) {
        
    }
}

module.exports = User

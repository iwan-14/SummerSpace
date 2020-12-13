const userModel = require('../model/user')
const orderModel = require('../model/order')

const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

class User {
    constructor() {}
    serveLogin(req, res) {
        res.render('sign-in')
    }

    serveRegister(req, res) {
        res.render('register')
    }

    serveCart(req, res) {
        res.render('cart')
    }

    serveCheckout(req, res) {
        res.render('checkout')
    }

    async getUserData(req, res) {
        const token = req.params.token
        const tokenData = await jwt.decode(token)
        res.status(200).json(tokenData)
    }

    async postUser(req, res) {
        const password = req.body.password
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound, '')
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
        const email = req.body.email
        const password = req.body.password
        try {
            const getUser = await userModel.find({
                email: email
            })
            if (!getUser) return res.redirect('/user/sign-in')
            const hashedPassword = getUser[0].password
            const match = await bcrypt.compare(password, hashedPassword)
            if (match) {
                const accessToken = await jwt.sign(getUser[0].toJSON(), 'secret')
                res.cookie('access_token', accessToken)
                return res.redirect('/')
            } else {
                res.redirect('/user/sign-in')
            }
        } catch(err) {
            console.log(err)
        }
    }

    async checkout(req, res) {
        const token = req.params.token;
        const tokenData = await jwt.decode(token);
        const userId = tokenData._id
        req.body.userId = userId
        try {
            await orderModel.create(req.body)
            res.redirect('/payment-verified')
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = User

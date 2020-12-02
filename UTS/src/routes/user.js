const express = require('express')
const router = express.Router()

const UserController = require('../controller/user.controller')
const controller = new UserController

router.get("/sign-in", (req, res) => controller.serveLogin(req, res))
router.get("/register", (req, res) => controller.serveRegister(req, res))
router.post("/register", (req, res) => controller.postUser(req, res))
router.post("/sign-in", (req, res) => controller.login(req, res))

module.exports = router

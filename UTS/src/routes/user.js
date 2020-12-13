const express = require('express')
const router = express.Router()

const UserController = require('../controller/user.controller')
const controller = new UserController

router.get("/sign-in", (req, res) => controller.serveLogin(req, res))
router.get("/register", (req, res) => controller.serveRegister(req, res))
router.get("/cart", (req, res) => controller.serveCart(req, res))
router.get("/checkout", (req, res) => controller.serveCheckout(req, res))
router.get("/:token", (req, res) => controller.getUserData(req, res))
router.post("/register", (req, res) => controller.postUser(req, res))
router.post("/sign-in", (req, res) => controller.login(req, res))
router.post("/checkout/:token", (req, res) => controller.checkout(req, res))

module.exports = router

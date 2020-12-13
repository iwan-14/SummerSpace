const express = require('express')
const router = express.Router()

const MainController = require('../controller/main.controller')
const controller = new MainController

router.get("/", (req, res) => controller.serveHomePage(req, res))
router.get("/about-us", (req, res) => controller.serveAboutUs(req, res))
router.get("/contact-us", (req, res) => controller.serveContactUs(req, res))
router.get("/payment-verified", (req, res) => controller.servePaymentVerified(req, res))

module.exports = router

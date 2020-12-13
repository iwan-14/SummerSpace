const express = require('express')
const router = express.Router()

const ProductController = require('../controller/product.controller')
const controller = new ProductController

router.get("/shop", (req, res) => controller.serveShopPage(req, res))
router.get("/add", (req, res) => controller.serveAddPage(req, res))
router.get("/:id/detail", (req, res) => controller.serveDetailPage(req, res))
router.post("/add", (req, res) => controller.addProduct(req, res))

module.exports = router

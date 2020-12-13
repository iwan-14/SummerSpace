const path = require('path');
const productModel = require('../model/product');

class Product {
    async serveShopPage(req, res) {
        const products = await productModel.find()
        res.render('shop', {
            products: products
        });
    }
    
    serveAddPage(req, res) {
        res.render('product-add');
    }

    async serveDetailPage(req, res) {
        const productId = req.params.id;
        const productDetail = await productModel.findById(productId).exec();
        res.render('single', {
            product: productDetail
        });
    }

    _generateName(name) {
        return name.split(' ').join('-');
    }

    async addProduct(req, res, upload) {
        const images = req.files;
        if (!images) return res.redirect('back');
        const photo = images.photo;
        const url = path.join(__dirname, `../public/products/`, this._generateName(photo.name))
        try {
            await photo.mv(url);
        } catch(err) {
            console.log(err);
            return;
        }
        req.body.photo = `/products/${this._generateName(photo.name)}`
        try {
            await productModel.create(req.body);
        } catch(err) {
            console.log(err);
        }
        return res.redirect('back');
    }
}

module.exports = Product

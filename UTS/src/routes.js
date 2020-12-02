const routes = (app) => {
    app.get('/', (req, res) => {
        res.render('home')
    })
    app.get('/about-us', (req, res) => {
        res.render('about-us')
    })
    app.get('/checkout', (req, res) => {
        res.render('checkout')
    })
    app.get('/contact-us', (req, res) => {
        res.render('contact-us')
    })
}

module.exports = {
    routes
}

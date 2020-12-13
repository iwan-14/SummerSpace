class Main {
    serveHomePage(req, res) {
        res.render('home')
    }

    serveAboutUs(req, res) {
        res.render('about-us')
    }

    serveContactUs(req, res) {
        res.render('contact-us')
    }

    servePaymentVerified(req, res) {
        res.render('payment-verified')
    }
}

module.exports = Main

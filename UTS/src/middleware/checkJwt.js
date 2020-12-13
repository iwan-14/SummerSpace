const checkJwt = (req, res, next) => {
    console.log(req.cookies)
    const access_token = req.cookies.access_token
    if (access_token) {
        next()
    } 
}

module.exports = {
    checkJwt
}

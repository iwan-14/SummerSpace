const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');

// app route
const user = require('./routes/user')
const main = require('./routes/main.js')
const product = require('./routes/product')

const app = express()
const port = 3000
const ejs = require("ejs").__express;

// parse data
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// process .env
require('dotenv').config()

// processs cookie
app.use(cookieParser())

// connect to DB
try {
    (async() => {
        await mongoose.connect(`mongodb+srv://philip1412:${process.env.DB_PASSWORD}@cluster0.uewzp.mongodb.net/${process.env.CLUSTER_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true });
    })()
} catch(err) {
    console.log(err, 'error')
}

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs')
app.engine('.ejs', ejs)

// static folder path
app.use(express.static(__dirname + '/public'));

// app routes
app.use('/user', user)
app.use('/', main)
app.use('/product', product)

// start the app
app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})

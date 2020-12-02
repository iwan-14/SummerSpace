const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const ejs = require("ejs").__express;

// parse data
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// process .env
require('dotenv').config()

// connect to db
try {
    (async() => {
        console.log(process.env.CLUSTER_NAME)
        await mongoose.connect(`mongodb+srv://philip1412:${process.env.DB_PASSWORD}@cluster0.uewzp.mongodb.net/${process.env.CLUSTER_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true });
    })()
} catch(err) {
    console.log(err, 'error')
}

const user = require('./routes/user')

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs')
app.engine('.ejs', ejs)
app.use(express.static(__dirname + '/public'));

app.use('/user', user)

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})

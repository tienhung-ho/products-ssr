const express = require('express')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
require('dotenv').config()
const clientRoutes = require('./routes/client/index.route.js')
const adminRoutes = require('./routes/admin/index.route.js')
const sysConfig = require('./config/system.js')
const app = express()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const database = require('./config/database')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


database.connect()

const port = process.env.PORT

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


app.locals.prefixAdmin = sysConfig.prefix_admin

clientRoutes(app)
adminRoutes(app)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

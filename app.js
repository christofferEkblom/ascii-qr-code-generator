'use strict'

require('dotenv').config()
const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = process.env.PORT
const mongoose = require('./config/mongoose.js')
const bodyParser = require('body-parser')
const oauthserver = require('oauth2-server')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.oauth = oauthserver({
  model: require('./models/Oauth2.js'),
  grants: ['password', 'client_credentials'],
  debug: false
})

mongoose.run().catch(error => {
  console.error(error)
  process.exit(1)
})

app.use("/public", express.static('./public'))

app.all('/oauth/token',  app.oauth.grant())

app.use('/', require('./routes/home'))
app.use('/', require('./routes/api'))
app.use('/', app.oauth.authorise(), require('./routes/admin'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(app.oauth.errorHandler())

app.listen(port)

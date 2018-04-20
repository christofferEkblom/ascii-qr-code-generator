'use strict'

require('dotenv').config()
const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = process.env.PORT
const requireDir = require('require-dir')
const routes = requireDir('./routes')
const mongoose = require('./config/mongoose.js')
const bodyParser = require('body-parser')

mongoose.run().catch(error => {
  console.error(error)
  process.exit(1)
})

app.use("/public", express.static('./public'))
app.use(bodyParser())

for(let i in routes) {
  app.use('/', routes[i])
}

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.listen(port)

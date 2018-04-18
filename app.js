'use strict'

require('dotenv').config()
const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = process.env.PORT
const constants = require('./lib/constants')
const requireDir = require('require-dir');
const routes = requireDir('./routes');

app.use(constants.PUBLIC_DIR, express.static('./' + constants.PUBLIC_DIR))

for(let i in routes) {
  app.use('/', routes[i])
}

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.listen(port)

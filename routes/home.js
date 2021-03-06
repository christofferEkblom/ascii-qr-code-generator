'use strict'

const router = require('express').Router()
const find = require('find')

function getCssFiles(callback){
	find.file(/\.min.css$/, './public/scss', function(files) {
	  return callback(files)
	})
}

router.get('/', function(req, res) {
  getCssFiles(function(data) { 
    res.render('home', { css_files: data, greeting: 'Hello world!'})
  })
})

module.exports = router

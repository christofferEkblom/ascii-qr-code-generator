'use strict'

const router = require('express').Router()
const qr_generator = require("../lib/qr-generator")
const sample_data = require('../lib/sample-data')

router.get('/api/get-qr', function(req, res) {
  if(req.query.data == null || req.query.data == '') {
    return res.send('No input data')
  }
  
  qr_generator.generateQR(req.query.data, function(err, data) { 
    res.send(data)
  })
})

router.get('/api/get-random-sample-data', function(req, res) {
  sample_data.randomize(function(err, sampleData) {
    res.send(sampleData)
  })
})

router.get('/api/get-sample-data-list', function(req, res) {
  sample_data.getAll(function(err, sampleData) {
    res.send(sampleData)
  })
})

module.exports = router

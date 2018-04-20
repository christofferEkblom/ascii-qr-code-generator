'use strict'

const router = require('express').Router()
const qr_generator = require("../lib/qr-generator")
const sample_data_randomizer = require('../lib/sample-data-randomizer')
const SampleData = require('../models/SampleData')

router.get('/api', function(req, res) {
  if(req.query.data == null || req.query.data == '') {
    req.query.data = "no input data"
  }
  
  qr_generator.generateQR(req.query.data, function(err, data) { 
    res.send(data)
  })
})

router.get('/api/sample-data', function(req, res) {
  sample_data_randomizer.randomize(function(err, sampleData) {
    res.send(sampleData)
  })
})

router.post('/api', function (req, res, next) {
  let item = {
  	data: req.body.data
  }
  
  let data = new SampleData(item)
  data.save()

  res.send(true)
})

router.delete('/api/:id', function (req, res, next) {
  let id = req.params.id
  SampleData.findByIdAndRemove(id, function(err) {
    if(err) {
      res.send(err)
    } else {
      res.send(true)
    }
  })
})

module.exports = router

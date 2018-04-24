'use strict'

const router = require('express').Router()
const SampleData = require('../models/SampleData')

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

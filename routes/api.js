'use strict'

const router = require('express').Router()
const qr_generator = require("../lib/qr-generator")

router.get('/api', function(req, res) {
  qr_generator.generateQR(req.query.data, function(err, data) { 
    res.send(data)
  })
})

module.exports = router

'use strict'

const SampleData = require('../models/SampleData')

module.exports = {
  randomize : function(callback) {
    SampleData.find().then(function(doc) {
      let randomIndex = Math.floor(Math.random() * Math.floor(doc.length))
      return callback(null, doc[randomIndex]["data"])
    })
  }
}

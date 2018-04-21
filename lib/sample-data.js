'use strict'

const SampleData = require('../models/SampleData')

module.exports = {
  getAll : function(callback) {
    SampleData.find().then(function(doc) {
      return callback(null, doc)
    })
  },

  randomize : function(callback) {
    SampleData.find().then(function(doc) {
      let randomIndex = Math.floor(Math.random() * Math.floor(doc.length))
      return callback(null, doc[randomIndex])
    })
  }
}

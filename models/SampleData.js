'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SampleDataSchema = new Schema({
  data: {type: String, required: true}
})

const SampleData = mongoose.model('SampleData', SampleDataSchema)

module.exports = SampleData

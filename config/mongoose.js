'use strict'

const mongoose = require('mongoose')
const connected = 'mongoose connected'
const error = 'mongoose error: '
const disconnected = 'mongoose disconnected'

module.exports.run = async () => {
  mongoose.Promise = global.Promise

  mongoose.connection.on('connected', () => {
    console.log(connected)
  })

  mongoose.connection.on('error', err => {
    console.error(error + err)
  })

  mongoose.connection.on('disconnected', () => {
    console.log(disconnected)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(disconnected)
      process.exit(0)
    })
  })

  return mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
}

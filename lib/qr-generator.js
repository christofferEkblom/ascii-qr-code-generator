'use strict'

const qrcode_terminal = require('qrcode-terminal')

module.exports = {
  generateQR : function(req, callback) {
    qrcode_terminal.generate(req, { small: true }, function(data) {
      callback(null, data)
    })
  }
}

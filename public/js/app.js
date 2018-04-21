'use strict'

var app = {
  init : function() {
    new ClipboardJS('.btn');
    app.fetchSampleData().then(data => app.updateForm(data));

    app.getInput().addEventListener('keyup', app.getQRFromUserInput, false);
    app.getInput().addEventListener('click', app.resetInput, false);
    app.getInput().addEventListener('blur', app.resetInput, false);
  },

  getInput : function() {
    return document.getElementById('input');
  },

  getInitialInputValue : function() {
    return document.getElementById('initial-input-data');
  },

  getOutput: function() {
    return document.getElementById('output');
  },

  async fetchSampleData() {
    const sampleData = await window.fetch('api/sample-data');
    return sampleData.json();
  },

  async getQR(data) {
    const qr = await window.fetch('api?data=' + data);
    return qr.text();
  },

  resetInput : function() {
    if(app.getInput().value == app.getInitialInputValue().value) {
      app.getInput().value = "";
    }
    else if(app.getInput().value == "") {
      app.getInput().value = app.getInitialInputValue().value;
    }
  },

  getQRFromUserInput : function() {
    app.getQR(app.getInput().value).then(qr => app.getOutput().value = qr + '\n' + app.getInput().value);
  },

  updateForm : function(data) {
    let sampleData = data['data'];
    app.getInput().value = sampleData;
    app.getInitialInputValue().value = sampleData;
    app.getQRFromUserInput();
  }
}

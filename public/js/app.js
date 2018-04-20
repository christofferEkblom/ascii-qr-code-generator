'use strict'

var app = {
  init : function() {
    let input = app.getInput();
    app.fetchSampleData()
    app.update();
    input.addEventListener('keyup', app.update, false);
    input.addEventListener('focus', app.resetInput, false);
    input.addEventListener('blur', app.restoreInput, false);
    new ClipboardJS('.btn');
  },

  getInput : function() {
    return document.getElementById('input');
  },

  getOutput: function() {
    return document.getElementById('output');
  },

  getInitialInputValue : function() {
    return document.getElementById('initial-input-data').value;
  },

  fetchQR : function(content) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        app.getOutput().value = this.responseText + '\n' + app.getInput().value;
      }
    }

    xhttp.open('GET', 'api?data=' + content, true);
    xhttp.send('null');
  },

  fetchSampleData : function() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        app.getInput().value = this.responseText;
      }
    }

    xhttp.open('GET', 'api/sample-data', true);
    xhttp.send('null');
  },

  update : function() {
    app.getOutput().value = '\n\n\n\nPocessing data...';
    app.fetchQR(app.getInput().value);
  },

  resetInput : function() {
    if(app.getInput().value === app.getInitialInputValue()) {
      app.getInput().value = '';
    }
  },

  restoreInput : function() {
    if(app.getInput().value === '') {
      app.getInput().value = app.getInitialInputValue();
    }
  }
}

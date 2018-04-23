'use strict'

var app = {
  init : function() {
    new ClipboardJS('.btn');
    app.fetchSampleData().then(data => app.updateForm(data));

    app.getInput().addEventListener('keyup', app.getQRFromUserInput, false);
    app.getInput().addEventListener('click', app.resetInput, false);
    app.getInput().addEventListener('blur', app.resetInput, false);

    app.getRefreshButton().addEventListener('click', app.init, false);
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

  getRefreshButton : function() {
    return document.getElementById('refresh');
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
    let fetchQR = function() {
      app.getQR(app.getInput().value).then(qr => app.getOutput().value = qr + '\n' + app.getInput().value);
    }

    app.renderLoader(fetchQR, 500, 500);
  },

  updateForm : function(data) {
    let sampleData = data['data'];
    app.getInput().value = sampleData;
    app.getInitialInputValue().value = sampleData;
    app.getQRFromUserInput();
  },

  renderLoader : function(next, speed, duration) {
    let frames = '◰◳◲◱'.split('');
    let start = Date.now();

    let step = function (timestamp) {
      app.getOutput().style.fontSize = '200px';
      let frame = Math.floor(timestamp * frames.length / speed) % frames.length;
      app.getOutput().value = '\n\n\n\n\n' + frames[frame];
  
      if(Date.now() - start < duration) {
        window.requestAnimationFrame(step, next);
      }
      else {
        app.getOutput().style.fontSize = 'inherit';
        next();
      }
    }

    window.requestAnimationFrame(step, next);
  }
}

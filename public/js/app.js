'use strict'

var app = {
  init : function() {
    new ClipboardJS('.btn');
    let tooltips = document.getElementsByClassName("tooltip");
    
    for(let i = 0; i < tooltips.length; i++) {
      tooltips[i].addEventListener("click", app.showTooltip, false);
    }

    app.fetchSampleData().then(data => app.updateForm(data));

    app.getInput().addEventListener('keyup', app.getQRFromUserInput, false);
    app.getInput().addEventListener('click', app.resetInput, false);
    app.getInput().addEventListener('blur', app.resetInput, false);

    app.getOutput().addEventListener('input', app.restoreOutput, false);

    app.getRefreshButton().addEventListener('click', app.init, false);
  },

  getInput : function() {
    return document.getElementById('input');
  },

  getInitialInputValue : function() {
    return document.getElementById('initial-input-data');
  },

  getInitialOutputValue : function() {
    return document.getElementById('initial-output-data');
  },

  getOutput: function() {
    return document.getElementById('output');
  },

  getRefreshButton : function() {
    return document.getElementById('refresh');
  },

  async fetchSampleData() {
    const sampleData = await window.fetch('api/get-random-sample-data');
    return sampleData.json();
  },

  async getQR(data) {
    const qr = await window.fetch('api/get-qr?data=' + data);
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

  restoreOutput : function() {
    app.getOutput().value = app.getInitialOutputValue().value;
  },

  getQRFromUserInput : function() {
    let fetchQR = function() {
      app.getQR(app.getInput().value)
        .then(function(qrCode) {
          let value = qrCode + '\n' + app.getInput().value;
          app.getOutput().value = value;
          app.getInitialOutputValue().value = value;
        });
    }

    let spinnerSpeed = 500;
    let spinnerDuration = 500;

    app.renderLoader(fetchQR, spinnerSpeed, spinnerDuration);
  },

  updateForm : function(data) {
    let sampleData = data['data'];
    app.getInput().value = sampleData;
    app.getInitialInputValue().value = sampleData;
    app.getQRFromUserInput();
  },

  renderLoader : function(next, speed, duration) {
    let frames = '◰◳◲◱'.split('');
    let padding = '\n\n\n\n\n';
    let loaderSize = '200px';
    let start = Date.now();

    let step = function (timestamp) {
      app.getOutput().style.fontSize = loaderSize;
      let frame = Math.floor(timestamp * frames.length / speed) % frames.length;
      app.getOutput().value = padding + frames[frame];
  
      if(Date.now() - start < duration) {
        window.requestAnimationFrame(step, next);
      }
      else {
        app.getOutput().style.fontSize = 'inherit';
        next();
      }
    }

    window.requestAnimationFrame(step, next);
  },

  showTooltip : function(event) {
    let element = this.firstChild;
    let opacity = window.getComputedStyle(element, null).getPropertyValue("opacity");

    element.style.top = (event.offsetY + 25) + "px";
    element.style.left = (event.offsetX) + "px";

    if(opacity < 1) {
      element.style.opacity = 1;
            
      setTimeout(function() {
        element.style.opacity = 0;
      }, 2000);
    }
  }
}

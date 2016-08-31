(function(){

  'use strict';

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var x = document.getElementById('js-x'),
      y = document.getElementById('js-y'),
      iframe = document.getElementById('js-iframe'),
      clear = document.getElementById('js-clear'),
      outputValues = document.getElementById('js-output-values'),
      postMessage = document.getElementById('js-post-message'),
      windowParent = document.getElementById('js-window-parent'),
      htmlConsole = document.getElementById('js-html-console');

  //----------------------------------------------------------------------------

  var logs = [];

  /**
   * output log to HTML and console
   *
   * @param {String} text
   */
  function output(text) {
    logs.unshift(text);

    if (logs.length > 2000) {
      logs = logs.slice(0, 2000);
    }

    htmlConsole.innerHTML = logs.join('\n');

    console.log(text);
  }

  /**
   * output object data
   *
   * @param {Object} data
   */
  function outputObject(data) {
    var key;

    for (key in data) {
      hasOwnProperty.call(data, key) && output(key + ': ' + data[key]);
    }
  }

  //----------------------------------------------------------------------------

  var w, db, dd;

  x.innerHTML = 'x: ';
  y.innerHTML = 'y: ';

  iframe.contentWindow.onscroll = function(event) {
    var left, top;

    output('onscroll');

    w || (w = iframe.contentWindow);
    db || (db = iframe.contentDocument.body);
    dd || (dd = iframe.contentDocument.documentElement);

    left = (w.pageXOffset !== void 0) ? w.pageXOffset :
      dd.scrollLeft || db.parentNode.scrollLeft || db.scrollLeft;

    top = (w.pageYOffset !== void 0) ? w.pageYOffset :
      dd.scrollTop || db.parentNode.scrollTop || db.scrollTop;

    output('x: ' + left);
    output('y: ' + top);

    x.innerHTML = 'x: ' + left;
    y.innerHTML = 'y: ' + top;
  };

  iframe.contentDocument.body.onwheel = function() {
    output('onwheel');
  };

  iframe.contentDocument.body.onmousewheel = function() {
    output('onmousewheel');
  };

  iframe.contentDocument.body.ontouchstart = function() {
    output('ontouchstart');
  };

  iframe.contentDocument.body.ontouchend = function() {
    output('ontouchend');
  };

  //----------------------------------------------------------------------------

  window.onscroll = function() {
    output('window.onscroll');
  };

  //----------------------------------------------------------------------------

  clear.onclick = function() {
    logs = [];
    htmlConsole.innerHTML = '';
  };

  outputValues.onclick = function() {
    output('iframe.contentWindow.scrollY: ' + iframe.contentWindow.scrollY);
    output('iframe.contentWindow.scrollX: ' + iframe.contentWindow.scrollX);
    output('iframe.contentWindow.pageYOffset: ' + iframe.contentWindow.pageYOffset);
    output('iframe.contentWindow.pageXOffset: ' + iframe.contentWindow.pageXOffset);
    output('iframe.contentDocument.body.scrollTop: ' + iframe.contentDocument.body.scrollTop);
    output('iframe.contentDocument.body.scrollLeft: ' + iframe.contentDocument.body.scrollLeft);
    output('iframe.contentDocument.documentElement.scrollTop: ' + iframe.contentDocument.documentElement.scrollTop);
    output('iframe.contentDocument.documentElement.scrollLeft: ' + iframe.contentDocument.documentElement.scrollLeft);
  };

  postMessage.onclick = function() {
    window.onmessage = function(event) {
      var data = JSON.parse(event.data);

      output('--------------------------------------------------');
      output('result of postMessage');

      outputObject(data);

      output('--------------------------------------------------');
    };

    if (typeof iframe.postMessage === 'function') {
      iframe.postMessage('', 'https://sasaplus1-prototype.github.io');
    } else {
      iframe.contentWindow.postMessage('', 'https://sasaplus1-prototype.github.io');
    }
  };

  windowParent.onclick = function() {
    var result, key;

    output('--------------------------------------------------');

    result = iframe.contentWindow.getIframeScrollValues();
    output('result of iframe.contentWindow.getIframeScrollValues()');

    outputObject(result);

    output('--------------------------------------------------');

    result = window.__iframeData;
    output('result of window.__iframeData');

    outputObject(result);

    output('--------------------------------------------------');
  };

  //----------------------------------------------------------------------------

  var overflowX = document.getElementById('js-overflow-x'),
      overflowY = document.getElementById('js-overflow-y'),
      overflowFrame = document.getElementById('js-overflow-frame'),
      overflowConsole = document.getElementById('js-html-console-overflow');

  overflowX.innerHTML = 'x: ';
  overflowY.innerHTML = 'y: ';

  overflowFrame.onscroll = function(event) {
    var left = overflowFrame.scrollLeft,
        top = overflowFrame.scrollTop;

    console.log('scrollLeft: ' + left);
    console.log('scrollTop: ' + top);

    overflowX.innerHTML = 'x: ' + left;
    overflowY.innerHTML = 'y: ' + top;
  };

}());

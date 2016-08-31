(function(){

  'use strict';

  window.getIframeScrollValues = function() {
    var w = window.top,
        f = w.parent;

    var data = {
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      pageYOffset: window.pageYOffset,
      pageXOffset: window.pageXOffset,
      bodyScrollTop: document.body.scrollTop,
      bodyScrollLeft: document.body.scrollLeft,
      htmlScrollTop: document.documentElement.scrollTop,
      htmlScrollLeft: document.documentElement.scrollLeft
    };

    f.__iframeData = data;

    return data;
  };

  window.onmessage = function(event) {
    if (event.origin !== 'https://sasaplus1-prototype.github.io') {
      return;
    }

    event.source.postMessage(JSON.stringify({
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      pageYOffset: window.pageYOffset,
      pageXOffset: window.pageXOffset,
      bodyScrollTop: document.body.scrollTop,
      bodyScrollLeft: document.body.scrollLeft,
      htmlScrollTop: document.documentElement.scrollTop,
      htmlScrollLeft: document.documentElement.scrollLeft
    }), event.origin);
  };

}());

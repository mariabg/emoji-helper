(function() {
  var exports = {};

  function send(name, data){
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, data);
    document.documentElement.dispatchEvent(event);
  }

  exports.getLocal = function(name, cb) {
    send("get", name);

    var listener = function(event) {
      cb(event.detail);
      window.removeEventListener("send_" + name, listener);
    };

    // suffix data name to have unique recepients
    window.addEventListener("send_" + name, listener, false);
  };

  exports.setLocal = function(item) {
    send("set", item);
  };

  exports.copyToClipboard = function(domElement) {
    domElement.focus();
    domElement.select();
    send("copy", domElement.value);
  };

  window.vendor = exports;
}());

var Emitter = require('events').EventEmitter;
var assert = require('assert');
var querystring = require('querystring');

var WRAPPER_SELECTOR = '.gt_wrapper';

var bus = new Emitter();

window.gt_custom_ajax = function (result, id, message) {
  var elements;
  if (typeof id === 'function') {
    elements = [id('.geetest_challenge'), id('.geetest_validate'), id('.geetest_seccode')];
  } else {
    elements = document.getElementById(id).getElementsByTagName('input');
  }
  bus.emit('receive', {
    id: id,
    result: !!result,
    message: (message + '').toLowerCase(),
    value: {
      geetest_challenge: elements[0].value,
      geetest_validate: elements[1].value,
      geetest_seccode: elements[2].value
    }
  });
};

var id = function (container) {
  var wrapper = container.querySelector(WRAPPER_SELECTOR);
  return wrapper && wrapper.id;
};

module.exports = function (container, config) {
  var channel, script;

  assert(container, 'container is required');
  assert(config, 'config is required');
  assert(config.gt, 'config.gt is required');

  channel = new Emitter();
  script = document.createElement('script');

  script.src = 'http://api.geetest.com/get.php?' + querystring.stringify(config);
  script.async = true;

  bus.on('receive', function (info) {
    if (id(container) === info.id) {
      channel.emit('MESSAGE', info);
      channel.emit(info.message, info.value);
    }
  });

  container.appendChild(script);

  return channel;
};

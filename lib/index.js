'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ignoredMethods = ['constructor', 'componentWillMount', 'componentDidMount', 'componentDidUpdate', 'componentWillReceiveProps', 'componentWillUnmount', 'render'];

var registerEasyBindApi = function registerEasyBindApi(target) {
  target.prototype.easyBind = function () {
    for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
      options[_key] = arguments[_key];
    }

    var fn = options[0],
        params = options.slice(1);

    if (typeof fn !== 'function') {
      console.error('Error: In \'' + target.name + '\', first parameter of easyBind should be a function but got ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + '.');
      return;
    }
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return fn.apply(null, params.concat(args));
    };
  };
};

var bindFn = function bindFn(el, propDescriptor) {
  return {
    configurable: true,
    get: function get() {
      var bindedFn = propDescriptor.value.bind(this);
      Object.defineProperty(this, el, {
        configurable: true,
        writable: true,
        value: bindedFn
      });
      return bindedFn;
    },
    set: function set(newValue) {
      if (el !== 'easyBind') Object.defineProperty(this, el, {
        configurable: true,
        writable: true,
        value: newValue
      });
    }
  };
};

var easyBind = function easyBind(target) {

  registerEasyBindApi(target);

  var targetPrototype = target.prototype;
  var targetProperties = Object.getOwnPropertyNames(targetPrototype);
  var filteredProperties = targetProperties.filter(function (el) {
    return !(ignoredMethods.indexOf(el) > -1);
  });

  filteredProperties.forEach(function (el) {
    var propDescriptor = Object.getOwnPropertyDescriptor(targetPrototype, el);
    Object.defineProperty(targetPrototype, el, bindFn(el, propDescriptor));
  });

  return target;
};

exports.default = easyBind;
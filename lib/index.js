'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
Copyright (c) 2016 Pranesh Ravi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
{
  (function () {

    var ignoredMethods = ['constructor', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUpdate', 'shouldComponentUpdate', 'componentDidUpdate', 'componentWillUnmount', 'render'];

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
          return propDescriptor.value.bind(this);
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

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = easyBind;else if (typeof define === 'function' && define.amd) define([], function () {
      return easyBind;
    });else window.ReactEasyBind = easyBind;
  })();
}
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

{
  (function () {
    var bindStringFunction = function bindStringFunction(fn, _ref) {
      var _this = this;

      var target = _ref.target,
          extraArgs = _ref.args;

      return function () {
        try {
          return _this[fn].apply(_this, extraArgs.concat.apply(extraArgs, arguments));
        } catch (e) {
          console.error(e);
          console.error('Error: \'' + fn + '\' is not defined in \'' + target.name + '\'');
          return undefined;
        }
      };
    };

    var bindFunction = function bindFunction(fn, _ref2) {
      var _this2 = this;

      var target = _ref2.target,
          extraArgs = _ref2.args;

      return function () {
        return fn.apply(_this2, extraArgs.concat.apply(extraArgs, arguments));
      };
    };

    var classifyType = function classifyType(fn, targetAndArgs) {
      switch (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) {
        case 'string':
          return bindStringFunction.apply(this, [fn, targetAndArgs]);
        case 'function':
          return bindFunction.apply(this, [fn, targetAndArgs]);
        default:
          console.error('Error: Unsupported type \'' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + '\'');
          return undefined;
      }
    };

    var seedEasyBind = function seedEasyBind(target) {
      var fnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'easyBind';

      target.prototype[fnName] = function () {
        var _arguments = Array.prototype.slice.call(arguments),
            fn = _arguments[0],
            args = _arguments.slice(1);

        return classifyType.call(this, fn, { target: target, args: args });
      };
      return target;
    };

    var ReactEasyBind = function ReactEasyBind(A, B) {
      if (B) {
        return seedEasyBind(A, B);
      }
      if (typeof A === 'string') {
        return function (target) {
          return seedEasyBind(target, A);
        };
      } else {
        return seedEasyBind.apply(undefined, arguments);
      }
    };
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = ReactEasyBind;else if (typeof define === 'function' && define.amd) define([], function () {
      return ReactEasyBind;
    });else window.ReactEasyBind = ReactEasyBind;
  })();
}
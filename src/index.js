(function () {
  var bindAndAddProperty = function bindAndAddProperty(target, fnName = 'easyBind') {
    target.prototype[fnName] = function () {
      const [fn, ...args] = arguments
      return function () {
        try {
          target.prototype[fn].apply(target, args.concat.apply(args, arguments))
        } catch (e) {
          console.error(e)
          console.error('\'' + fn + '\' is not defined in ' + target.name)
        }
      }
    }
    return target
  }

  var ReactEasyBind = function ReactEasyBind(A, B) {
    if (B) {
      //when using ES5 with custom function name
      return bindAndAddProperty(A, B);
    }
    if (typeof A === 'string') {
      return function (target) {
        return bindAndAddProperty(target, A);
      };
    } else {
      //when using decorator and ES5 style without custom function name
      return bindAndAddProperty(...arguments);
    }
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = ReactEasyBind
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return ReactEasyBind;
      });
    }
    else {
      window.ReactEasyBind = ReactEasyBind;
    }
  }
})();

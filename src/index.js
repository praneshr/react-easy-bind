{
  const bindStringFunction = function bindStringFunction(fn, { target, args: extraArgs }) {
    return (...args) => {
      try {
        return this[fn].apply(this, extraArgs.concat(...args))
      } catch (e) {
        console.error(e)
        console.error(`Error: '${fn}' is not defined in '${target.name}'`)
        return undefined
      }
    }
  }

  const bindFunction = function bindFunction(fn, { target, args: extraArgs }) {
    return (...args) => fn.apply(this, extraArgs.concat(...args))
  }

  const classifyType = function(fn, targetAndArgs) {
    switch (typeof fn) {
      case 'string':
        return bindStringFunction.apply(this, [fn, targetAndArgs])
      case 'function':
        return bindFunction.apply(this, [fn, targetAndArgs])
      default:
        console.error(`Error: Unsupported type '${typeof fn}'`)
        return undefined
    }
  }

  const seedEasyBind = (target, fnName = 'easyBind') => {
    target.prototype[fnName] = function() {
      const [fn, ...args] = arguments
      return classifyType.call(this, fn, { target, args })
    }
    return target
  }

  const ReactEasyBind = function ReactEasyBind(A, B) {
    if (B) {
      return seedEasyBind(A, B);
    }
    if (typeof A === 'string') {
      return function (target) {
        return seedEasyBind(target, A);
      };
    } else {
      return seedEasyBind(...arguments);
    }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
      module.exports = ReactEasyBind
  else if (typeof define === 'function' && define.amd)
      define([], () => ReactEasyBind)
  else
    window.ReactEasyBind = ReactEasyBind
}

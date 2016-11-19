const ignoredMethods = [
  'constructor',
  'componentWillMount',
  'componentDidMount',
  'componentDidUpdate',
  'componentWillReceiveProps',
  'componentWillUnmount',
  'render',
]

const flattenArray = params => params.reduce((a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b), [])

const registerEasyBindApi = (target) => {
  target.prototype.easyBind = (...options) => {
    const [fn, ...params] = options
    if (typeof fn !== 'function') {
      console.error(`Error: In '${target.name}', first parameter of easyBind should be a function but got ${typeof fn}.`)
      return
    }
    return (...args) => fn.apply(null, flattenArray(params).concat(args))
  }
}


const bindFn = (el, propDescriptor) => {
  return {
    configurable: true,
    get: function get() {
      const bindedFn = propDescriptor.value.bind(this)
      Object.defineProperty(this, el, {
        configurable: true,
        writable: true,
        value: bindedFn,
      })
      return bindedFn
    },
    set: function set(newValue) {
      if (el !== 'easyBind')
        Object.defineProperty(this, el, {
          configurable: true,
          writable: true,
          value: newValue,
        })
    }
  }
}

const easyBind = (target) => {

  registerEasyBindApi(target)
  
  const targetPrototype = target.prototype
  const targetProperties = Object.getOwnPropertyNames(targetPrototype)
  const filteredProperties = targetProperties.filter(el => !(ignoredMethods.indexOf(el) > -1))

  filteredProperties.forEach((el) => {
    const propDescriptor = Object.getOwnPropertyDescriptor(targetPrototype, el)
    Object.defineProperty(targetPrototype, el, bindFn(el, propDescriptor))
  })

  return target
}

export default easyBind
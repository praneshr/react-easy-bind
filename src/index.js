/*
Copyright (c) 2016 Pranesh Ravi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const ignoredMethods = [
  'constructor',
  'componentWillMount',
  'componentDidMount',
  'componentDidUpdate',
  'componentWillReceiveProps',
  'componentWillUnmount',
  'render',
]


const registerEasyBindApi = (target) => {
  target.prototype.easyBind = (...options) => {
    const [fn, ...params] = options
    if (typeof fn !== 'function') {
      console.error(`Error: In '${target.name}', first parameter of easyBind should be a function but got ${typeof fn}.`)
      return
    }
    return (...args) => fn.apply(null, params.concat(args))
  }
}


const bindFn = (el, propDescriptor) => {
  return {
    configurable: true,
    get: function get() {
      return propDescriptor.value.bind(this)
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

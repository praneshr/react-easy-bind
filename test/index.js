import LegacyDefault from './es5-classes'
import UsingDecorators from './es6-classes'

import expect from 'expect'

describe('Testing React Auto Bind', () => {
  describe('Testing with ES6 Decorators', () => {

    it('Should have "autoBind" registered in the Class', () => {
      expect(UsingDecorators.prototype.easyBind).toBeA('function')
    })

    it('Should return a function when onClick is initiated with "string function name" passed to easyBind', () => {
      expect(UsingDecorators.prototype.onClick()).toBeA('function')
    })

    it('Should return a function when onClick is called with "string function name" passed to easyBind', () => {
      const event = {
        type: 'click',
      }
      expect(UsingDecorators.prototype.onClick({ event })())
      .toEqual({ arg1: 'test', arg2: { event } })
    })

    it('Should return proper context with "function reference" passed to easyBind', () => {
      expect(UsingDecorators.prototype.onHover()().handleClick).toBeA('function')
    })

    it('Should return actual and the additional parameters passed', () => {
      expect(UsingDecorators.prototype.onOut()(6, 7, 8, 9, 10).length).toEqual(10)
      expect(UsingDecorators.prototype.onOut()(6, 7, 8, 9, 10))
      .toEqual([1,2,3,4,5,6,7,8,9,10])
    })

    it('Should return "undefined" when unsupported type is passed', () => {
      expect(UsingDecorators.prototype.triggerError()).toEqual(undefined)
    })

    it('Should return "undefined" when the target function is undefined', () => {
      expect(UsingDecorators.prototype.udf()).toEqual(undefined)
    })
  })

  describe('Testing with ES5', () => {

    it('Should have "autoBind" registered in the Class', () => {
      expect(LegacyDefault.prototype.easyBind).toBeA('function')
    })

    it('Should return a function when onClick is initiated with "string function name" passed to easyBind', () => {
      expect(LegacyDefault.prototype.onClick()).toBeA('function')
    })

    it('Should return a function when onClick is called with "string function name" passed to easyBind', () => {
      const event = {
        type: 'click',
      }
      expect(LegacyDefault.prototype.onClick({ event })())
      .toEqual({ arg1: 'test', arg2: { event } })
    })

    it('Should return proper context with "function reference" passed to easyBind', () => {
      expect(LegacyDefault.prototype.onHover()().handleClick).toBeA('function')
    })

    it('Should return actual and the additional parameters passed', () => {
      expect(LegacyDefault.prototype.onOut()(6, 7, 8, 9, 10).length).toEqual(10)
      expect(LegacyDefault.prototype.onOut()(6, 7, 8, 9, 10))
      .toEqual([1,2,3,4,5,6,7,8,9,10])
    })

    it('Should return "undefined" when unsupported type is passed', () => {
      expect(LegacyDefault.prototype.triggerError()).toEqual(undefined)
    })

    it('Should return "undefined" when the target function is undefined', () => {
      expect(LegacyDefault.prototype.undefinedFn()).toEqual(undefined)
    })
  })
})

import easyBind from '../lib'

var test = function() {}
test.prototype.handleClick = function(arg1, arg2){
  return { arg1, arg2 }
}

test.prototype.handleHover = function() {
  return this
}

test.prototype.handleOut = function() {
  return [...arguments]
}

test.prototype.undefinedFn = function() {
  return this.easyBind('xyz')
}

test.prototype.triggerError = function() {
  return this.easyBind({})
}

test.prototype.onClick = function(e) {
  return this.easyBind('handleClick', 'test', e)
}

test.prototype.onHover = function(){
  return this.easyBind(this.handleHover)
}

test.prototype.onOut = function() {
  return this.easyBind(this.handleOut, 1, 2, 3, 4, 5)
}



var test2 = function() {}
test2.prototype.handleClick = function(arg1, arg2){
  return { arg1, arg2 }
}

test2.prototype.handleHover = function(){
  return this
}

test2.prototype.undefinedFn = function() {
  return this.eb('xyz')
}

test2.prototype.triggerError = function() {
  return this.eb({})
}

test2.prototype.handleOut = function() {
  return [...arguments]
}

test2.prototype.onClick = function(e) {
  return this.eb('handleClick', 'test', e)
}

test2.prototype.onHover = function(){
  return this.eb(this.handleHover)
}

test2.prototype.onOut = function() {
  return this.eb(this.handleOut, 1, 2, 3, 4, 5)
}

var LegacyDefault = easyBind(test)
var LegacyCustom = easyBind(test2, 'eb')

export {
  LegacyDefault,
  LegacyCustom,
}

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
  return this.easyBind(this.xyz)
}

test.prototype.triggerError = function() {
  return this.easyBind({})
}

test.prototype.onClick = function(e) {
  return this.easyBind(this.handleClick, 'test', e)
}

test.prototype.onHover = function(){
  return this.easyBind(this.handleHover)
}

test.prototype.onOut = function() {
  return this.easyBind(this.handleOut, 1, 2, 3, 4, 5)
}


var LegacyDefault = easyBind(test)

export default LegacyDefault

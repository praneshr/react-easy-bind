import easyBind from '../lib'

@easyBind
class UsingDecorators {
  handleClick(arg1, arg2){
    return { arg1, arg2 }
  }

  handleHover(){
    return this
  }

  triggerError(){
    return this.easyBind({})
  }

  handleOut() {
    return [...arguments]
  }

  onClick(e) {
    return this.easyBind('handleClick', 'test', e)
  }

  undefinedFn() {
    return this.easyBind('xyz')
  }

  onHover(){
    return this.easyBind(this.handleHover)
  }

  onOut() {
    return this.easyBind(this.handleOut, 1, 2, 3, 4, 5)
  }
}


@easyBind('eb')
class UsingDecoratorsCustom {
  handleClick(arg1, arg2){
    return { arg1, arg2 }
  }

  handleHover(){
    return this
  }

  triggerError(){
    return this.eb({})
  }

  undefinedFn() {
    return this.eb('xyz')
  }

  handleOut() {
    return [...arguments]
  }

  onClick(e) {
    return this.eb('handleClick', 'test', e)
  }

  onHover(){
    return this.eb(this.handleHover)
  }

  onOut() {
    return this.eb(this.handleOut, 1, 2, 3, 4, 5)
  }
}

export {
  UsingDecorators,
  UsingDecoratorsCustom,
}

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
    return this.easyBind(this.handleClick, 'test', e)
  }

  udf() {
    return this.easyBind(this.xyz)
  }

  onHover(){
    return this.easyBind(this.handleHover)
  }

  onOut() {
    return this.easyBind(this.handleOut, 1, 2, 3, 4, 5)
  }
}


export default UsingDecorators

import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom'
import easyBind from '../../lib'

class Example extends Component {
  constructor(props) {
    super(props)
  }

  handleClick(v, e) {
    console.log(v, e)
  }

  render() {
    const list = [1,3,4,5,5,6,6,7,7,8,8,9,9,]
    const nodes = list.map((item) =>
      <div
        onClick={this.hello(this.props.test, item)}
        className="Example">
        {item}
      </div>)
    return (
      <div>
        {nodes}
      </div>
    );
  }
}

easyBind(Example, 'hello')

class Parent extends Component {
  constructor(props) {
    super(props)
  }
  test(){
    console.log(arguments, this);
  }
  render(){
    return <Example test={this.test} />
  }
}


ReactDOM.render(<Parent/>, document.getElementById('app'))

import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom'
import easyBind from '../../lib'


@easyBind
class Example extends Component {

  handleClick() {
    console.log(arguments)
  }

  render() {
    const list = ['apple', 'mango', 'pineapple', 'fig', 'strawberry']
    const nodes = list.map((item, i) =>
      <div
        key={i}
        onClick={this.easyBind(this.handleClick, item)}
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


ReactDOM.render(<Example/>, document.getElementById('app'))

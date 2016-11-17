import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom'
import easyBind from '../../lib'

@easyBind
export default class Example extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(v, e) {
    console.log(v, e);
  }

  render() {
    return (
      <div
        onClick={this.easyBind('handleClick', 'hello')}
        className="Example">
        MyComponent
      </div>
    );
  }
}

ReactDOM.render(<Example/>, document.getElementById('app'))

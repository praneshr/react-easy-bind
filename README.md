# React Easy Bind

A class decorator for react(compatible with normal classes as well ) which automatically binds all the properties of the class and provide a powerfull API to work with react event callbacks.


### Installation
```
npm i react-easy-bind --save-dev
```

### Usage
``` javascript

//ES6 way

import React, { Component, PropTypes } from 'react'
import easyBind from 'react-easy-bind'


@easyBind
class Example extends Component {
  constructor(props) {
    super(props)
  }

  handleClick(v, e) {
    console.log(this)
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        Hello world!
      </div>
    )
  }
}

//ES5 way
import React, { Component, PropTypes } from 'react'
import easyBind from 'react-easy-bind'

var Example = React.createClass({
  handleClick(v, e) {
    console.log(this)
  },

  render() {
    return (
      <div onClick={this.handleClick}>
        Hello world!
      </div>
    )
  }
}

easyBind(Example)
```

### `this.easyBind(fn[, param1[, param2[, ...]]])` API

The Easy Bind decorator will register an immutable function to the class and it'll be available as `this.easyBind()`.

`this.easyBind()` creates a wrapping function on behalf of you. By this you can pass any additional parameters to the callback handler without any arrow functions or explicit bindings.

#### Example
``` javascript
//before
<div onClick={(pe, e) => this.handleClick('param1', 'param2', pe, e)}

//now
<div onClick={this.easyBind(this.handleClick, 'param1', 'param2')}

handleClick(param1, param2, proxyEvent, Event) { }
```

### License

MIT

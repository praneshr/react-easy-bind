# React Easy Bind

A class [decorator](https://github.com/wycats/javascript-decorators) for react(compatible with normal classes as well ) which automatically binds all the properties of the class and provides a powerful API to work with react event callbacks.


### Installation
```
npm i react-easy-bind --save-dev
```

### Heads up

Please configure your build system/[babel](https://babeljs.io) if you are using `react-auto-bind` as a **decorator**.

Please check [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) for more details.

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

`this.easyBind()` creates a wrapping function over the callback function. By this you can pass any additional parameters to the callback handler through `this.easyBind()` without any arrow functions or explicit bindings.

#### Example
``` javascript
//before
<div onClick={(pe, e) => this.handleClick('param1', 'param2', pe, e)}

//now
<div onClick={this.easyBind(this.handleClick, 'param1', 'param2')}

handleClick(param1, param2, proxyEvent, Event) { }
```
`this.easyBind()` takes the `callback function` as the first parameter. And all the other parameters can be anything.

### Development

``` bash
$ git clone https://github.com/praneshr/react-easy-bind.git
$ cd react-easy-bind/
$ npm i
$ npm start
```
More options can be found under `scripts` in the `package.json`

### License

MIT

# react-native-checkbox-plus

[![NPM version][npm-image]][npm-url]
![react-native](https://img.shields.io/badge/react--native-%3E%3D_0.46.0-green.svg)
![react](https://img.shields.io/badge/react-%3E16.0.0-green.svg)
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-native-checkbox-plus.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-native-checkbox-plus
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/react-native-checkbox-plus.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-native-checkbox-plus

Simple customizable react-native checkbox Edit

## Getting Started

### Installation

```bash
npm i react-native-checkbox-plus --save
```

### Basic Usage

```JavaScript
import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import Checkbox from 'react-native-checkbox-plus'

class Example extends Component {
  ...
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
      isChecked_ShortHand: false
    }
  }
  ...
  render() {
    return (
        <View style={{flex: 1}}>
          /* Normal Case */
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            <Checkbox 
              isChecked={this.state.isChecked}
              action={() =>  this.setState({ isChecked: !this.state.isChecked }) }
            />
            <View style={{justifyContent:'center'}}>
              <Text>Check It now!</Text>
            </View>
          </View>
          /* ShortHand Case */
          <Checkbox
            useRipple={false}
            isAccessContext
            rightContext={<Text>What !?</Text>}
            isChecked={this.state.isChecked_ShortHand}
            action={() =>  this.setState({ isChecked_ShortHand: !this.state.isChecked_ShortHand })}
          />
        </View>
    )}
}

AppRegistry.registerComponent('Example', () => Example)
```

### Properties
---
| Props | Type | Default | Description |
|:----:|:----:|:----:|:-----------:|
| isChecked | bool(Required) | false | checkbox status  |
| action | func(Required) | () => { } | use action while press |
| useRipple | bool(Required) | true | use effect while press |
| size | number(Required) | false | size of ripple |
| checkedCustomIcon | string | - | use custom icon on checked status |
| unCheckedCustomIcon | string | - | use custom icon on unchecked status |
| isAccessContext | bool | false | access to use rightContext |
| rightContext | element | null | use custom in right context |

## License

react-native-checkbox-plus is released under the MIT license.
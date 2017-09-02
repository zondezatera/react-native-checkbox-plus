// Inspire and Modify from https://gist.github.com/xotahal/d59616b9ee980d29842bc5c99d20134a
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Easing,
  Platform
} from 'react-native'

class CheckBox extends Component {
  static propTypes = {
    size: PropTypes.number,
    isChecked: PropTypes.bool,
    action: PropTypes.func,
    useRipple: PropTypes.bool,
    checkedCustomIcon: PropTypes.string,
    unCheckedCustomIcon: PropTypes.string,
    isAccessContext: PropTypes.bool,
    rightContext: PropTypes.element,
    accessibilityLabel: PropTypes.string,
    testID: PropTypes.string
  }
  static defaultProps = {
    size: 20,
    isChecked: false,
    action: () => { },
    useRipple: true,
    isAccessContext: false,
    rightContext: null
  }
  constructor(props) {
    super(props)
    const maxOpacity = 0.2
    this.state = {
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity)
    }
  }
  onPressedIn = () => {
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android'
    }).start()
  }
  onPressedOut = () => {
    Animated.timing(this.state.opacityValue, {
      toValue: 0,
      useNativeDriver: Platform.OS === 'android'
    }).start(() => {
      this.state.scaleValue.setValue(0.01)
      this.state.opacityValue.setValue(this.state.maxOpacity)
    })
  }
  renderRippleView = () => {
    const { scaleValue, opacityValue } = this.state
    const rippleSize = this.props.size * 2
    if (this.props.useRipple) {
      return (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
            backgroundColor: "#000"
          }}
      />
      )
    }
    return null
  }
  renderBox() {
    if (this.props.isChecked) {
      return this.props.checkedCustomIcon ? this.genCheckedIcon(this.props.checkedCustomIcon) : this.genCheckedIcon()
    }
    return this.props.unCheckedCustomIcon ? this.genCheckedIcon(this.props.unCheckedCustomIcon) : this.genCheckedIcon()
  }
  genCheckedIcon(customIcon) {
    const CheckIcon = customIcon || require('./images/CHECKED.png')
    const UncheckIcon = customIcon || require('./images/UNCHECK.png')
    return this.props.isChecked ? <Image source={CheckIcon} /> : <Image source={UncheckIcon} />
  }
  renderRightContext() {
    if (this.props.isAccessContext) {
      return (
        <View style={styles.rightContext}>
          {this.props.rightContext}
        </View>
      )
    }
    return null
  }
  render() {
    const containerSize = this.props.size * 2
    const iconContainer = { width: containerSize, height: containerSize }
    return (
      <View style={styles.wrapperView}>
        <TouchableWithoutFeedback
          onPressIn={this.onPressedIn}
          onPressOut={this.onPressedOut}
          style={this.props.style}
          onPress={this.props.action}
          testID={this.props.testID}
          accessibilityLabel={this.props.accessibilityLabel}>
          <View style={iconContainer}>
            {this.renderRippleView()}
            <View style={styles.container}>
              {this.renderBox()}
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.renderRightContext()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContext: {
    justifyContent: 'center'
  }
})

export default CheckBox
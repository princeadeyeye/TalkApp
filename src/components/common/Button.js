import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextStyle,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
  ViewPropTypes,
} from 'react-native';

// import NativeButton from 'apsl-react-native-button';

import { ratio } from '../utils/Styles';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4 * ratio,
    borderWidth: 2 * ratio,
    width: 320 * ratio,
    height: 52 * ratio,
    borderColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: 'rgb(243,243,243)',
    alignSelf: 'center',
    borderRadius: 4 * ratio,
    borderWidth: 2 * ratio,
    width: 320 * ratio,
    height: 52 * ratio,
    borderColor: '#333',

    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14 * ratio,
    color: 'white',
  },
  imgLeft: {
    width: 24 * ratio,
    height: 24 * ratio,
    position: 'absolute',
    left: 16 * ratio,
  },
});

// interface ItemProps {
//   isLoading?: boolean;
//   isDisabled?: boolean;
//   onPress?: () => void;
//   style?: ViewStyle;
//   disabledStyle?: ViewStyle;
//   textStyle?: TextStyle;
//   imgLeftSrc?: ImageSourcePropType;
//   imgLeftStyle?: ImageStyle;
//   indicatorColor?: string;
//   activeOpacity?: number;
// }

// Button.propTypes = {
//   isLoading: PropTypes.bool,
//   isDisabled: PropTypes.bool,
//   onPress: PropTypes.func,
//   indicatorColor: PropTypes.string,
//   activeOpacity: PropTypes.number,
//   style: ViewPropTypes.style,
//   disabledStyle: ViewPropTypes.style,
//   textStyle: ViewPropTypes.style,
//   imgLeftStyle: ViewPropTypes.style,
//   imgLeftSrc: Image.propTypes.source
// }

// Button.defaultProps = {
//   isLoading: false,
//   isDisabled: false,
//   onPress : () => {},
//   indicatorColor: 'white',
//   activeOpacity: 0.5,
//   style: styles.btn,
//   disabledStyle: styles.btnDisabled,
//   textStyle: styles.txt,
//   imgLeftStyle: styles.imgLeft,
// }

class Button extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onPress: PropTypes.func,
    indicatorColor: PropTypes.string,
    activeOpacity: PropTypes.number,
    style: ViewPropTypes.style,
    disabledStyle: ViewPropTypes.style,
    textStyle: PropTypes.object,
    imgLeftStyle: PropTypes.object,
    imgLeftSrc: Image.propTypes.source
  }
  static defaultProps = {
    isLoading: false,
    isDisabled: false,
    onPress : () => {},
    indicatorColor: 'white',
    activeOpacity: 0.5,
    style: styles.btn,
    disabledStyle: styles.btnDisabled,
    textStyle: styles.txt,
    imgLeftStyle: styles.imgLeft,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

   render() {
    if (this.props.isDisabled) {
      return (
        <View style={this.props.disabledStyle}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }
    if (this.props.isLoading) {
      return (
        <View style={this.props.style}>
          <ActivityIndicator size='small' color={this.props.indicatorColor} />
        </View>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={this.props.onPress}
      >
        <View style={this.props.style}>
          {
            this.props.imgLeftSrc
              ? <Image
                style={this.props.imgLeftStyle}
                source={this.props.imgLeftSrc}
              />
              : null
          }
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export  {Button};

import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  TextInputProperties,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';


import { ratio, colors } from '../utils/Styles';

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    color: colors.blueyGray,
    marginBottom: 8 * ratio,
    fontSize: 12 * ratio,
  },
  labelFocus: {
    color: colors.dodgerBlue,
    marginBottom: 8 * ratio,
    fontSize: 12 * ratio,
  },
  input: {
    alignSelf: 'stretch',
    color: colors.dusk,
    fontSize: 16 * ratio,
    paddingVertical: 22 * ratio,
    paddingHorizontal: 20 * ratio,
    borderWidth: 1,
    borderColor: 'rgb(233,237,244)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputFocus: {
    alignSelf: 'stretch',
    color: colors.dusk,
    fontSize: 16 * ratio,
    paddingVertical: 22 * ratio,
    paddingHorizontal: 20 * ratio,
    borderWidth: 1,
    borderColor: colors.dodgerBlue,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

// interface ItemProps {
//   style?: ViewStyle;
//   labelStyle?: TextStyle;
//   labelStyleFocus?: TextStyle;
//   placeholderTextColor?: string;
//   inputStyle?: TextInputProperties;
//   isPassword?: boolean;
//   multiline?: boolean;
//   txtLabel?: string;
//   txtHint?: string;
//   txt?: string;
//   onFocus?: () => void;
//   onTextChanged?: (text) => void;
//   onSubmitEditing?: (text) => void;
//   returnKeyType?: any;
// }

class Input extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    labelStyle: PropTypes.object,
    labelStyleFocus: PropTypes.object,
    placeholderTextColor: PropTypes.string,
    inputStyle: ViewPropTypes.style,
    isPassword: PropTypes.bool,
    multiline: PropTypes.bool,
    txtLabel: PropTypes.string,
    txtHint: PropTypes.string,
    txt: PropTypes.string,
    onFocus: () => {},
    onTextChanged: (text) => {},
    onSubmitEditing: (text) => {},
    returnKeyType: PropTypes.string,
  }
   static defaultProps = {
    labelStyle: styles.label,
    labelStyleFocus: styles.labelFocus,
    placeholderTextColor: 'rgb(134,154,183)',
    isPassword: false,
    multiline: false,
    txtLabel: '',
    txtHint: '',
    txt: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

   render() {
    return (
      <View style={[
        styles.wrapper,
        this.props.style,
      ]}>
        { this.renderTxtLabel() }
        <TextInput
          style={[
            this.state.focused ? styles.inputFocus : styles.input,
            this.props.inputStyle,
          ]}
          underlineColorAndroid='transparent' // android fix
          autoCapitalize='none'
          autoCorrect={false}
          multiline={this.props.multiline}
          onChangeText={this.props.onTextChanged}
          value={this.props.txt}
          onFocus={ () => this.setState({ focused: true }) }
          onBlur={ () => this.setState({ focused: false }) }
          placeholder={this.props.txtHint}
          placeholderTextColor={this.props.placeholderTextColor}
          onSubmitEditing={this.props.onSubmitEditing}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={this.props.isPassword}
        />
      </View>
    );
  }

   renderTxtLabel = () => {
    if (this.props.txtLabel) {
      return (
        <Text style={this.state.focused ? this.props.labelStyleFocus : this.props.labelStyle}>
          {this.props.txtLabel}
        </Text>
      );
    }
    return null;
  }
}

export  {Input};

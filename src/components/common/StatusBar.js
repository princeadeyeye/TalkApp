import React, { Component } from 'react';
import {
  StatusBar,
  Platform,
  StatusBarStyle, 
} from 'react-native';
import { colors } from '../utils/Styles';
import PropTypes from 'prop-types';


// interface IProps {
//   isDarkContent: boolean;
// }

class Bar extends Component {

  static propTypes = {
    isDarkContent: PropTypes.bool
  }
   static defaultProps = {
    isDarkContent: false,
  };
  
   render() {
    const statusColor =  Platform.OS === 'android' 
      ? 'default'
        : this.props.isDarkContent
          ? 'dark-content'
          : 'light-content';
    return (
      <StatusBar
        barStyle={statusColor}
        backgroundColor={colors.darkBlue}
      />
    );
  }
}

export  {Bar};

import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Animated,
    Image,
    Text,
    View,
  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';


import { ratio, colors, statusBarHeight } from '../utils/Styles';
import { IC_MASK } from '../utils/Icons'
import { getString } from '../../../STRINGS'
import { animateRotateLoop } from '../utils/Functions'

import { Button, Input, Bar } from '../common'

export default class Loading extends Component {
    spinValue = new Animated.Value(0);
    spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1260deg'],
  });

  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate('AuthStackNavigator');
        return;
      }
      this.props.navigation.navigate('MainStackNavigator');
    });
  }

  componentDidMount() {
    animateRotateLoop(this.spinValue, 3000);
  }
    render() {
        return (
            <View style={styles.container}>
                <Animated.Image
                source={IC_MASK}
                style={{
                    width: 60 * ratio,
                    height: 60 * ratio,
                    marginBottom: 16 * ratio,
                    transform: [{ rotate: this.spin }],
                }}
                />
                <Animatable.Text
                animation='fadeIn'
                iterationCount={'infinite'}
                direction='alternate'
                style={{
                    color: colors.dodgerBlue,
                    fontSize: 16 * ratio,
                }}
                >
                { getString('LOADING') }
                </Animatable.Text>
             </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
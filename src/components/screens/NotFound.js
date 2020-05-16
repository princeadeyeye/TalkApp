import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView,
    Platform,
  } from 'react-native';

import { ratio, colors, statusBarHeight } from '../utils/Styles';
import { IC_BACK } from '../utils/Icons'
import { getString } from '../../../STRINGS'

import { Button, Input, Bar } from '../common'

export default class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    render() {
        return (
            <View style={styles.container}>
                <Text>Not Found</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: statusBarHeight, // false to get height of android too.
      backgroundColor: 'transparent',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
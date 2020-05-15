import React, { Component } from 'react'
import firebase from 'firebase';
import 'firebase/firestore';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types'

import { ratio, colors, statusBarHeight } from '../utils/Styles';
import { IC_BACK } from '../utils/Icons'
import { getString } from '../../../STRINGS'

import { Button, Input, Bar } from '../common'

export default class Signup extends Component {

    static navigationOptions = {
        title: getString('SIGNUP'),
      };
      constructor(props) {
        super(props);
        this.state = {
          isRegistering: false,
          email: '',
          pw: '',
          displayName: '',
          statusMsg: '',
        };
      }

      onRegister = () => {
        this.setState({ isRegistering: true }, async () => {
          try {
            const userData = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pw);
            userData.user.updateProfile({
              displayName: this.state.displayName,
              photoURL: '',
            });
    
            // realtime-database
            firebase.database().ref('users').child(`${userData.user.uid}`).set({
              displayName: this.state.displayName,
              email: this.state.email,
              photoURL: '',
              statusMsg: this.state.statusMsg,
            });
    
            // firestore
            firebase.firestore().collection('users').doc(`${userData.user.uid}`).set({
              displayName: this.state.displayName,
              email: this.state.email,
              photoURL: '',
              statusMsg: this.state.statusMsg,
            });
          } catch (err) {
            this.setState({ isRegistering: false });
            Alert.alert(getString('ERROR'), err.message);
          }
        });
    
      }
    
       onTextChanged = (type, text) => {
        switch (type) {
          case 'EMAIL':
            this.setState({ email: text });
            return;
          case 'PW':
            this.setState({ pw: text });
            return;
          case 'NAME':
            this.setState({ displayName: text });
            return;
          case 'STATUS_MSG':
            this.setState({ statusMsg: text });
            return;
        }
      }
    

    render() {
        return (
            <View style={styles.container}>
        <Bar isDarkContent={false}/>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.wrapper}>
            <Input
              style={{ marginTop: 8 * ratio }}
              txtLabel={getString('EMAIL')}
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
            />
            <Input
              style={{ marginTop: 24 * ratio }}
              txtLabel={ getString('PASSWORD') }
              txtHint={ getString('PASSWORD') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('PW', text)}
              isPassword={ true }
            />
            <Input
              style={{ marginTop: 24 * ratio }}
              txtLabel={getString('NAME')}
              txtHint={ getString('NAME') }
              txt={ this.state.displayName }
              onTextChanged={ (text) => this.onTextChanged('NAME', text)}
            />
            <Input
              style={{ marginTop: 24 * ratio }}
              txtLabel={getString('STATUS_MSG')}
              txtHint={ getString('STATUS_MSG') }
              txt={ this.state.statusMsg }
              onTextChanged={ (text) => this.onTextChanged('STATUS_MSG', text)}
            />
            <View style={styles.btnWrapper}>
              <Button
                isLoading={this.state.isRegistering}
                onPress={this.onRegister}
                style={styles.btnRegister}
                textStyle={styles.txtRegister}
              >{getString('REGISTER')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      alignItems: 'center',
    },
    scrollView: {
      alignSelf: 'stretch',
    },
    scrollViewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      marginTop: 40 * ratio,
      width: '78%',
  
      flexDirection: 'column',
      alignItems: 'center',
    },
    btnWrapper: {
      width: '100%',
      alignItems: 'flex-end',
    },
    btnRegister: {
      backgroundColor: colors.dodgerBlue,
      borderColor: colors.dodgerBlue,
      borderRadius: 4 * ratio,
      borderWidth: 1 * ratio,
      width: 136 * ratio,
      height: 60 * ratio,
      marginLeft: 4 * ratio,
      marginTop: 24 * ratio,
      marginBottom: 48 * ratio,
      shadowColor: colors.dodgerBlue,
      shadowOffset: {
        width: 0,
        height: 10 * ratio,
      },
      shadowRadius: 4 * ratio,
      shadowOpacity: 0.3,
  
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtRegister: {
      fontSize: 16 * ratio,
      fontWeight: 'bold',
      color: 'white',
    },
  });
  

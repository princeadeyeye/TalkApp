import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import firebaseConfig from './config'
import 'firebase/firestore';
import Login from './src/components/screens/Login'
import Signup from './src/components/screens/Signup'
import FindPw from './src/components/screens/FindPw'
import NotFound from './src/components/screens/NotFound'
import Loading from './src/components/screens/Loading'
import StackNavigator from './src/components/navigation/AuthStackNavigator'
import MainTabNavigator from './src/components/navigation/MainTabNavigator'
// import SwitchStackNavigator from './src/components/navigation/SwitchNavigation'
import { NavigationContainer } from '@react-navigation/native';
import ProfileUpdate from './src/components/screens/ProfileUpdate'
import Friend from './src/components/screens/Friend'
import Message from './src/components/screens/Message'
import SearchUser from './src/components/screens/SearchUser'
import Chat from './src/components/screens/Chat'
import MainStackNavigator from './src/components/navigation/MainStackNavigator'
import SwitchNavigator from './src/components/navigation/SwitchNavigation'


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
});

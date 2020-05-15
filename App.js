import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from './config'
import 'firebase/firestore';
import Login from './src/components/screens/Login'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
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

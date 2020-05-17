import React, { Component } from 'react'
import firebase from 'firebase';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import MainTabNavigator, {MainTabNavigationOptions} from './MainTabNavigator';
import { createAppContainer } from 'react-navigation';

import ProfileUpdate from  '../screens/ProfileUpdate'
import SearchUser from '../screens/SearchUser'
import Chat from '../screens/Chat'
import NotFound from '../screens/NotFound'
import {ProfileModal} from '../common'
import appStore from '../../stores/appStore'
import { colors } from '../utils/Styles'
// import { observer } from 'mobx-react';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

const routeConfig = {
    Main: { screen: MainTabNavigator, navigationOptions: MainTabNavigationOptions },
    ProfileUpdate: { screen: ProfileUpdate },
    SearchUser: { screen: SearchUser },
    Chat: { screen: Chat },
    NotFound: { screen: NotFound },
  };
  
  export const commonNavigationOptions = {
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: colors.dodgerBlue, 
      borderBottomColor: 'transparent', 
      borderBottomWidth: 0, 
      elevation: 0,
    },
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white', 
  };
  
  const navigatorConfig = {
    initialRouteName: 'Main',
    gesturesEnabled: true,
    navigationOptions: commonNavigationOptions,
  };
  

  const StackNavigator = createStackNavigator(routeConfig, navigatorConfig);

class RootNavigator extends Component {
     static router = StackNavigator.router;

     onChat = () => {
        appStore.profileModal.close();
        this.props.navigation.navigate('Chat');
      }
  
     render() {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <StackNavigator
            navigation={this.props.navigation}
          />
          <ProfileModal
            ref={(v) => appStore.profileModal = v}
            onChat={this.onChat}
          />
        </View>
      );
    }
  }
  
  
  const MainStackNavigator = createAppContainer(RootNavigator)
  export default MainStackNavigator;

  

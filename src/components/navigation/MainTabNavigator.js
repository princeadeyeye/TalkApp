import React from 'react'
import { Platform, Image, View, Text, AsyncStorage, BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
import { ratio, colors, statusBarHeight } from '../utils/Styles'
import { getString } from '../../../STRINGS'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {
    StackActions,
    TabNavigator,
    TabBarTop,
    NavigationAction,
    createAppContainer,
  } from 'react-navigation';

  import { LinearGradient } from 'expo-linear-gradient';
  import { IC_MASK, IC_ADD } from '../utils/Icons'

  import Friend from '../screens/Friend'
  import Message from '../screens/Message'

  const Navigator = createMaterialTopTabNavigator(
    {
      Friend: { screen: Friend },
      Message: { screen: Message },
    },
    {
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarVisible: true,
        tabBarLabel: ({focused}) => {
          const { routeName } = navigation.state;
          switch (routeName) {
            case 'Friend':
              return <Text style={[styles.txt, {opacity: focused ? 1 : 0.8}]}>
                  {getString('FRIEND')}  <Text style={styles.txtSub}>24</Text>
                </Text>;
            case 'Message':
              return <Text style={[styles.txt, {opacity: focused ? 1 : 0.8}]}>
                  {getString('MESSAGE')}  <Text style={styles.txtSub}>8</Text>
                </Text>;
          }
          return null;
        },
      }),
      animationEnabled: true,
      swipeEnabled: true,
      tabBarOptions: {
        indicatorStyle: {
          backgroundColor: 'white',
        },
        style: {
          height: 40,
          justifyContent: 'center',
          backgroundColor: colors.dodgerBlue,
          borderTopColor: 'transparent', borderTopWidth: 0, elevation: 0,
        },
      },
    },
  );
  
 const MainTabNavigator = createAppContainer(Navigator)
  export default MainTabNavigator;
  
  export const MainTabNavigationOptions = ({navigation}) => ({
    title: 'The Talk',
    headerLeft: () =>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('ProfileUpdate')}
      >
        <Image style={styles.imgHeaderLeft} source={IC_MASK}/>
      </TouchableOpacity>,
    headerRight: () =>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('SearchUser')}
      >
        <Image style={styles.imgHeaderRight} source={IC_ADD}/>
      </TouchableOpacity>,
  });
  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: statusBarHeight, // false to get height of android too.
  },
  imgHeaderLeft: {
    marginLeft: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: 'white',
    borderWidth: 1,
  },
  imgHeaderRight: {
    width: 60,
    height: 60,
    tintColor: 'black',
  },
  txt: {
    color: 'white',
    fontSize: 15,
  },
  txtSub: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700', 
  },
});
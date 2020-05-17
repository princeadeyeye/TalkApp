import React, { Component } from 'react'
import firebase from 'firebase';
import { USE_FIRESTORE } from '../utils/Constants'
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    View,
    FlatList,
    Platform,
    Animated, 
  } from 'react-native';

import { UserListItem, EmptyListItem } from '../common'
import { ratio, colors, statusBarHeight } from '../utils/Styles'
import { IC_BACK, IC_SEARCH } from '../utils/Icons'
import { getString } from '../../../STRINGS'
import appStore from '../../stores/appStore'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class SearchUser extends Component {
    static navigationOptions = {
        title: getString('SEARCH_USER'),
      };
    profileModal= '';
    searchTxt = '';
    scrollY = new Animated.Value(0);
      
   constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    console.log('componentDidMount', 'SearchUser');
    /**
     * get all the users
     */
    if (USE_FIRESTORE) {
      firebase.firestore().collection('users')
      .orderBy('displayName', 'asc')
      .get().then((snapshots) => {
        const users = [];
        snapshots.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          if (user.email !== firebase.auth().currentUser.email) {
            users.push(user);
          }
        });
        this.setState({ users });
      });
      return;
    }
    firebase.database().ref('users')
    .orderByChild('displayName')
    .once('value')
    .then((snapshots) => {
      const users = [];
      snapshots.forEach((doc) => {
        const user = doc.val();
        user.id = doc.key;
        if (user.email !== firebase.auth().currentUser.email) {
          users.push(user);
        }
      });
      this.setState({ users });
    });
  }

  onScroll = (e) => {
    // console.log(e.nativeEvent.contentOffset.y);
  }

   renderItem = ({ item }) => {
    return (
      <UserListItem
        item={item}
        onPress={() => this.onItemClick(item)}
      />
    );
  }

   onItemClick = (item) => {
    console.log(item);
    appStore.profileModal.setUser(item);
    appStore.profileModal.showAddBtn(true);
    appStore.profileModal.open();
  }

   onTxtChanged = (txt) => {
    // this.searchTxt = txt;
    console.log(`onTxtChanged: ${txt}`);
    this.setState({
      searchTxt: txt,
    });
  }

   onSearch = () => {
    console.log('onSearch: ' + this.searchTxt);
    if (USE_FIRESTORE) {
      firebase.firestore().collection('users')
      .where('displayName', '>=', this.searchTxt)
      .where('displayName', '<', `${this.searchTxt}\uf8ff`)
      .get().then((snapshots) => {
        const users = [];
        snapshots.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          console.log(user);
          if (user.email !== firebase.auth().currentUser.email) {
            users.push(user);
          }
        });
        this.setState({ users });
      });
      return;
    }
    firebase.database().ref('users')
    .orderByChild('displayName')
    .startAt(this.searchTxt)
    .endAt(`${this.searchTxt}\uf8ff`)
    .once('value')
    .then((snapshots) => {
      const users = [];
      snapshots.forEach((doc) => {
        const user = doc.val();
        user.id = doc.key;
        if (user.email !== firebase.auth().currentUser.email) {
          users.push(user);
        }
      });
      this.setState({ users });
    });
  }

   onChat = () => {
    this.props.navigation.navigate('Chat');
  }

    render() {
        return (
            <View style={styles.container}>
        <Animated.View style={[styles.viewSearch, 
          {height: 50, transform: [{translateY: this.scrollY.interpolate({ 
            inputRange: [-50, 0, 50, 100], 
            outputRange: [0, 0, -50, -50],
          })}],  
          }]}>
          <Animated.View style={{position: 'absolute', width: '100%', paddingHorizontal: 20, height: 50, 
            opacity: this.scrollY.interpolate({ 
            inputRange: [-50, 0, 50, 100], 
            outputRange: [1, 1, 0, 0],
          })}}>
            <TextInput
              onChangeText={(text) => this.onTxtChanged(text)}
              underlineColorAndroid='transparent' // android fix
              autoCapitalize='none'
              autoCorrect={false}
              multiline={false}
              // value={this.searchTxt}
              style={{width: '100%', height: 30, top: 10, backgroundColor: 'white', 
                 borderRadius: 4, paddingLeft: 34, paddingRight: 10}}
              onSubmitEditing={this.onSearch}
              defaultValue={this.searchTxt}
            />
            <Image source={IC_SEARCH} style={styles.imgSearch}/>
          </Animated.View>
        </Animated.View>
        <AnimatedFlatList
          style={{
            width: '100%', height: '100%', marginBottom: -50, 
            transform: [{translateY: this.scrollY.interpolate({ 
              inputRange: [-50, 0, 50, 100], 
              outputRange: [0, 0, -50, -50],
            })}],
          }}
          contentContainerStyle={
            this.state.users.length === 0
              ? {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          data={this.state.users}
          renderItem={this.renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
          
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
            {useNativeDriver: true, listener: this.onScroll}, 
          )}
        />
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
    viewSearch: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: colors.dodgerBlue,
      overflow: 'hidden',
    },
    imgSearch: {
      position: 'absolute', 
      width: 16,
      height: 16,
      left: 30, top: 18,
    },
    inputSearch: {
      backgroundColor: 'rgb(247,248,251)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 4,
    },
  });
  

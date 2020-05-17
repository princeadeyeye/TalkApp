import React, { Component } from 'react'
import firebase from 'firebase';
import { USE_FIRESTORE } from '../utils/Constants';

import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    FlatList,
    Platform,
  } from 'react-native';
import { ratio, colors, screenWidth } from '../utils/Styles'
import { getString } from '../../../STRINGS'
import appStore from '../../stores/appStore'
import {EmptyListItem, UserListItem, Bar} from '../common'
import update from 'immutability-helper';

export default class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
          friends: [],
        };
      }
    
      componentDidMount() {
        /**
         * get all friends
         */
        const userData = firebase.auth().currentUser;
        console.log(userData, "user data")
        if (USE_FIRESTORE) {
          firebase.firestore().collection('users')
          .doc(`${userData.uid}`).collection('friends')
          .onSnapshot((snapshots) => {
            const friends = this.state.friends;
            if (snapshots.size === 0) {
              this.setState({ friends: [] });
              return;
            }
            snapshots.docChanges().forEach((change) => {
              let user = change.doc.data();
              console.log('user', user);
              user.friendId = change.doc.id;
              firebase.firestore().collection('users').doc(user.id).onSnapshot((friendSnap) => {
                if (change.type === 'added') {
                  user = { ...user, ...friendSnap.data() };
                  friends.push(user);
                  if (snapshots.size === friends.length) {
                    this.setState({ friends });
                    return;
                  }
                }
    
                if (change.type === 'removed') {
                  const index = this.state.friends.findIndex((el) => {
                    return el.friendId === user.friendId;
                  });
                  console.log(index);
                  this.setState({
                    friends: update(
                      this.state.friends, {
                        $splice: [ [ index, 1 ] ],
                      },
                    ),
                  });
                }
    
                // if (change.type === 'modified') {
                //   const index = this.state.friends.findIndex((el) => {
                //     return el.friendId === user.friendId;
                //   });
                //   this.setState({
                //     friends: update(
                //       this.state.friends, {
                //         [index]: user,
                //       },
                //     ),
                //   });
                // }
              });
            });
          });
          return;
        }
        firebase.database().ref(`users/${userData.uid}`).child('friends')
        .on('value', (snapshots) => {
          const friends = [];
          if (snapshots.numChildren() === 0) {
            this.setState({ friends });
            return;
          }
          snapshots.forEach((doc) => {
            let user = doc.val();
            user.friendId = doc.key;
            firebase.database().ref(`users/${user.id}`)
            .on('value', (friendSnap) => {
              user = { ...user, ...friendSnap.val() };
              friends.push(user);
              if (snapshots.numChildren() === friends.length) {
                this.setState({ friends });
              }
            });
          });
        });
      }

      renderItem = ({ item }) => {
        return (
          <UserListItem
            item={item}
            onPress={() => this.onItemClick(item)}
          />
        );
      }
    
       onItemClick = async (item) => {
        appStore.profileModal.setUser(item);
        appStore.profileModal.showAddBtn(false);
        appStore.profileModal.open();
      }
    
    render() {
        return (
            <View style={styles.container}>
            <Bar isDarkContent={false}/>
            <FlatList
              style={{
                alignSelf: 'stretch',
              }}
              contentContainerStyle={
                this.state.friends.length === 0
                  ? {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                  : null
              }
              keyExtractor={(item, index) => index.toString()}
              data={this.state.friends}
              renderItem={this.renderItem}
              ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
            />
          </View>
        )
    }
}


styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

import React, { Component } from 'react'
import {EmptyListItem, ChatroomListItem, Bar} from '../common'
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


export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
          messages: [
            {
              id: 1,
              img: null,
              displayName: 'dooboolab',
              msg: 'When are you finishing??',
              count: 6,
              date: new Date(),
            },
            {
              id: 2,
              img: null,
              displayName: 'Byun8585',
              msg: 'Hi. This is student from react-native...',
              count: 0,
              date: new Date(),
            },
        ],
        };
      }
    renderItem = ({ item }) => {
        return (
          <ChatroomListItem
            item={item}
            onPress={() => this.onItemClick(item.id)}
          />
        );
      }
    
      onItemClick = (itemId) => {
        console.log(`onItemClick: ${itemId}`);
        this.props.navigation.navigate('Chat', {chatId: itemId});
      }
    render() {
        return (
            <View style={styles.container}>
            <FlatList
              style={{
                alignSelf: 'stretch',
              }}
              contentContainerStyle={
                this.state.messages.length === 0
                  ? {
                    flex: 1,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                  : null
              }
              keyExtractor={(item, index) => index.toString()}
              data={this.state.messages}
              renderItem={this.renderItem}
              ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
            />
          </View>
        )
    }
}

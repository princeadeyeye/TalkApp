import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    Text,
    View,
    FlatList,
    TextInput,
    Platform,
    Keyboard,
  } from 'react-native';
  import { IC_BACK, IC_SMILE } from '../utils/Icons'
  import { ratio, colors, statusBarHeight } from '../utils/Styles'
  import { getString } from '../../../STRINGS'
  import { LinearGradient } from 'expo-linear-gradient';

  import { Button, ChatListItem, EmptyListItem } from '../common'

export default class Chat extends Component {

    static navigationOptions = {
        title: getString('CHAT'),
      };
      keyboardDidShowListener
      constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          showMenu: false,
          chats: [
            {
              id: '0',
              sender: '0',
              img: null,
              message: 'hello',
              date: new Date(),
              isPeer: true,
            },
            {
              id: '1',
              sender: '1',
              img: null,
              message: 'hello',
              date: new Date(),
              isPeer: false,
            },
          ],
        };
      }

       componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardDidShow(e));
      }
    
       componentWillUnmount() {
        this.keyboardDidShowListener.remove();
      }

      _keyboardDidShow(e) {
        console.log('keyboardHeight', e.endCoordinates.height);
    }
    
       renderItem = ({ item }) => {
        return (
          <ChatListItem
            item={item}
          />
        );
      }
    
       sendChat = () => {
        console.log('sendChat');
      }
    
       showMenu = () => {
        console.log('showMenu');
        Keyboard.dismiss();
        this.setState({
          showMenu: !this.state.showMenu,
        });
      }
    
       goBack = () => {
        this.props.navigation.goBack();
      }
    
    render() {
        return (
            <View style={styles.container}>
        <KeyboardAvoidingView
          behavior='padding'
          style={ styles.content }
        >
          <FlatList
            style={{
              alignSelf: 'stretch',
            }}
            contentContainerStyle={
              this.state.chats.length === 0
                ? {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
                : null
            }
            keyExtractor={(item, index) => index.toString()}
            data={this.state.chats}
            renderItem={this.renderItem}
            ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
          />
          {
            !this.state.showMenu
              ? <View
              style={styles.viewChat}
            >
              <TextInput
                style={styles.inputChat}
                placeholder={ getString('WRITE_MESSAGE') }
                placeholderTextColor={ colors.cloudyBlue }
              />
              <TouchableOpacity
                style={styles.touchMenu}
                onPress={this.showMenu}
              >
                <Image style={styles.imgMenu} source={IC_SMILE}/>
              </TouchableOpacity>
              <Button
                isLoading={this.state.isLoading}
                onPress={this.sendChat}
                style={styles.btnSend}
                textStyle={styles.txtSend}
              >{getString('SEND')}</Button>
            </View>
            : null
          }
        </KeyboardAvoidingView>
        {
          this.state.showMenu
            ? <View style={styles.viewBottom}>
              <View style={styles.viewChat}>
                <TextInput
                  style={styles.inputChat}
                  placeholder={ getString('WRITE_MESSAGE') }
                  placeholderTextColor={ colors.cloudyBlue }
                />
                <TouchableOpacity
                  style={styles.touchMenu}
                  onPress={this.showMenu}
                >
                  <Image style={styles.imgMenu} source={IC_SMILE}/>
                </TouchableOpacity>
                <Button
                  isLoading={this.state.isLoading}
                  onPress={this.sendChat}
                  style={styles.btnSend}
                  textStyle={styles.txtSend}
                >{getString('SEND')}</Button>
              </View>
              <View  style={styles.viewMenu}/>
            </View>
            : null
        }
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
    content: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'stretch',
  
      flexDirection: 'column',
      alignItems: 'center',
    },
    viewChat: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: colors.paleGray,
      height: 52 * ratio,
  
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    inputChat: {
      width: '80%',
      fontSize: 14 * ratio,
      marginRight: 20 * ratio,
      paddingLeft: 48 * ratio,
    },
    touchMenu: {
      position: 'absolute',
      left: 10,
      height: '100%',
      minWidth: 20 * ratio,
      justifyContent: 'center',
    },
    imgMenu: {
      width: 20 * ratio,
      height: 20 * ratio,
    },
    btnSend: {
      right: 8 * ratio,
      backgroundColor: colors.dodgerBlue,
      borderRadius: 4 * ratio,
      width: 60 * ratio,
      height: 36 * ratio,
  
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtSend: {
      fontSize: 14 * ratio,
      fontWeight: 'bold',
      color: 'white',
      paddingHorizontal: 5 * ratio,
      paddingVertical: 10 * ratio,
    },
    viewBottom: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    viewMenu: {
      height: 258,
      backgroundColor: 'green',
    },
  });
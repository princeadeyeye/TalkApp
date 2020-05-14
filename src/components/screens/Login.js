import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StatusBar, View, Image, Text, TextInput } from 'react-native'


export default class Login extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
           <ScrollView>
            <StatusBar />
            <View>
                <View>
                    <Image source={IC_ICON} />
                    <Text>{getString('HELLO')}</Text>
                </View>
                <View>
                    <TextInput />
                    <TextInput />
                </View>
            </View>
           </ScrollView>
        )
    }
}

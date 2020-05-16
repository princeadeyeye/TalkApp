import { createSwitchNavigator } from 'react-navigation-stack'
import Loading from '../screens/Loading'
import AuthStackNavigator from './AuthStackNavigator'

export default createSwitchNavigator (
    {
    Loading,
    AuthStackNavigator,
    },
    {
        initialRouteName: 'Loading'
    },   
)
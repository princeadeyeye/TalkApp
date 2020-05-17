import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Loading from '../screens/Loading'
import AuthStackNavigator from './AuthStackNavigator'
import MainStackNavigator from './MainStackNavigator'

const Navigator = createSwitchNavigator (
    {
        Loading,
        AuthStackNavigator,
        MainStackNavigator,
    },
    {
        initialRouteName: 'Loading'
    },   
)

const SwitchNavigator = createAppContainer(Navigator)
export default SwitchNavigator;
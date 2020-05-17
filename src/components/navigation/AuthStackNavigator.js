import { createStackNavigator } from 'react-navigation-stack'
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { createAppContainer } from 'react-navigation';

import Login from '../screens/Login'
import Signup from '../screens/Signup'
import FindPw from '../screens/FindPw'
import NotFound from '../screens/NotFound'
import { commonNavigationOptions } from '../navigation/MainStackNavigator'

const StackNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup },
        FindPw: { screen: FindPw },
        NotFound: { screen: NotFound }
    },
    {
        initialRouteName: 'Login',
        navigationOptions: commonNavigationOptions,
    }
)
const AuthStackNavigator = createAppContainer(StackNavigator)
export default AuthStackNavigator;

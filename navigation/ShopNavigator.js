import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Screen Imports
import ScreenProductOverview from '../screens/shop/ScreenProductOverview';
import ScreenProductDetails from '../screens/shop/ScreenProductDetails';
//Constant Imports
import Colors from '../constants/Colors';

const productsStackNavigator = createStackNavigator({
    ProductOverview: ScreenProductOverview,
    ProductDetail: ScreenProductDetails,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ?  'white' : Colors.primary
    }
});

export default createAppContainer(productsStackNavigator);
//React Imports
import React from 'react';
import { Platform } from 'react-native';
//React Navigation Imports
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
//Expo Imports
import { Ionicons } from '@expo/vector-icons';
//Screen Imports
import ScreenProductOverview from '../screens/shop/ScreenProductOverview';
import ScreenProductDetails from '../screens/shop/ScreenProductDetails';
import ScreenCart from '../screens/shop/ScreenCart';
import ScreenOrders from '../screens/shop/ScreenOrders';
import ScreenUserProducts from '../screens/user/ScreenUserProducts';
import ScreenEditProduct from '../screens/user/ScreenEditProduct';
//Constant Imports
import Colors from '../constants/Colors';



//Create a default Navigation Options variable for re-use in code
const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}



//Shop Stack Navigator =====================================================================================================
const productsStackNavigator = createStackNavigator({
    ProductOverview: ScreenProductOverview,
    ProductDetail: ScreenProductDetails,
    Cart: ScreenCart
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
});



//Orders Stack Navigator ===================================================================================================
const ordersStackNavigator = createStackNavigator({
    Orders: ScreenOrders,
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
});



//Orders Stack Navigator ===================================================================================================
const usersStackNavigator = createStackNavigator({
    UserProducts: ScreenUserProducts,
    EditProduct: ScreenEditProduct,
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
});



//App Drawer Navigator =====================================================================================================
const appDrawerNavigator = createDrawerNavigator({
    Products: productsStackNavigator,
    Orders: ordersStackNavigator,
    Users: usersStackNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});



export default createAppContainer(appDrawerNavigator);
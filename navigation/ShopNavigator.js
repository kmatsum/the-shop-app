//React Imports
import React from 'react';
import { Platform, View, SafeAreaView, Button } from 'react-native';
//Redux Imports
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/action/authActions';
//React Navigation Imports
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
//Expo Imports
import { Ionicons } from '@expo/vector-icons';
//Screen Imports
import ScreenProductOverview from '../screens/shop/ScreenProductOverview';
import ScreenProductDetails from '../screens/shop/ScreenProductDetails';
import ScreenCart from '../screens/shop/ScreenCart';
import ScreenOrders from '../screens/shop/ScreenOrders';
import ScreenUserProducts from '../screens/user/ScreenUserProducts';
import ScreenEditProduct from '../screens/user/ScreenEditProduct';
import ScreenAuth from '../screens/user/ScreenAuth';
import ScreenStartup from '../screens/ScreenStartup';
//Constant Imports
import Colors from '../constants/Colors';



//Create a default Navigation Options variable for re-use in code
const defaultNavigationOptions = {
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
    defaultNavigationOptions: defaultNavigationOptions,
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
    defaultNavigationOptions: defaultNavigationOptions,
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
    defaultNavigationOptions: defaultNavigationOptions,
});



//App Drawer Navigator =====================================================================================================
const appDrawerNavigator = createDrawerNavigator({
    Products: productsStackNavigator,
    Orders: ordersStackNavigator,
    Users: usersStackNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: (props) => {
        //Create a React-Redux dispatch constant
        const dispatch = useDispatch();
        //Return the JSX Component =====
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerNavigatorItems {...props} />
                    <Button
                        title='Logout'
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(authActions.logout);
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
});



//Authentication Navigator =================================================================================================
const AuthNavigator = createStackNavigator({
    Auth: ScreenAuth
}, {
    defaultNavigationOptions: defaultNavigationOptions
});



//Main Navigator ===========================================================================================================
const MainNavigator = createSwitchNavigator({
    Startup: ScreenStartup,
    Auth: AuthNavigator,
    Shop: appDrawerNavigator
});



export default createAppContainer(MainNavigator);
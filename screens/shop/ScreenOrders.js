//React Imports
import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Platform
} from 'react-native';
//Redux Imports
import { useSelector } from 'react-redux';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Component Imports
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';



//Navigation Options =======================================================================================================
ScreenOrders.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};



//Main Function ============================================================================================================
export default function ScreenOrders(props) {
    const orders = useSelector((state) => state.orders.orders);

    //Return JSX Component =================================================================================================
    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <OrderItem
                    totalAmount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
}
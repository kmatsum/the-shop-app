//React Imports
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Platform,
    ActivityIndicator
} from 'react-native';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as ordersActions from '../../redux/action/orderActions';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Constant Imports
import Colors from '../../constants/Colors';
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    

    //Return JSX Component =================================================================================================
    //LOADING VIEW =====
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        );
    } //END OF: LOADING VIEW =====



    //PRODUCT LIST EMPTY SCREEN =====
    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No orders found...</Text>
            </View>
        );
    }



    //DEFAULT VIEW =====
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

//StyleSheet ===============================================================================================================
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
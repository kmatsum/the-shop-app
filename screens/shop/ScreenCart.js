//React Imports
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Button
} from 'react-native';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../redux/action/cartActions';
import * as ordersActions from '../../redux/action/orderActions';
//Constant Imports
import Colors from '../../constants/Colors';
//Custom Components Imports
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';



//Navigation Options =======================================================================================================
ScreenCart.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Your Cart'
    };
};



//Main Function ============================================================================================================
export default function ScreenCart(props) {
    const totalCartPrice = useSelector((state) => state.cart.totalCartPrice);
    //Get all the Cart Items in the Redux-Store
    const cartItems = useSelector((state) => {
        //Create an Array, to store the new Objects
        const cartItemsInArrayForm = [];

        //Loop through each Object in cartItems
        for (const key in state.cart.cartItems) {
            //Push the new Object onto the array
            cartItemsInArrayForm.push({
                productId: key,
                productTitle: state.cart.cartItems[key].productTitle,
                productPrice: state.cart.cartItems[key].productPrice,
                quantity: state.cart.cartItems[key].quantity,
                totalSum: state.cart.cartItems[key].totalSum,
            });
        }

        //Return the SORTED Array-Form cartItems to useSelector()
        return (
            cartItemsInArrayForm.sort((a, b) => {
                return ( a.productId > b.productId ? 1: -1 )
            })
        );
    });

    //(Since React Hooks cannot be used outside a JSX Object, we will use a variable as a POINTER to POINT to the function 'useDispatch())
    const dispatch = useDispatch();



    //Return JSX Component =================================================================================================
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.cartTotal}>${Math.round(totalCartPrice.toFixed(2) * 100) / 100}</Text></Text>
                <Button
                    title='Order Now'
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        console.log('=== Order dispatched ===');
                        dispatch(ordersActions.addOrder(cartItems, totalCartPrice));
                    }}
                />
            </Card>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.productId}
                    renderItem={(itemData) => (
                        <CartItem
                            productTitle={itemData.item.productTitle}
                            productQuantity={itemData.item.quantity}
                            productSumPrice={itemData.item.totalSum}
                            deletable={true}
                            onRemove={() => {
                                console.log('=== removeCartItem dispatched ===');
                                dispatch(cartActions.removeFromCart(itemData.item.productId));
                            }}
                        />
                    )}
                />
            </View>
        </View>
    );
}



//StyleSheet ===============================================================================================================
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: '2.5%'
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 20,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    cartTotal: {
        color: Colors.accent
    }
});
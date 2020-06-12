//React Imports
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
//Constant Imports
import Colors from '../../constants/Colors';
//Custom Component Imports
import CartItem from './CartItem';



//Main Function Component ==================================================================================================
export default function OrderItem(props) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.summaryTotalAmount}>${props.totalAmount.toFixed(2)}</Text>
                <Text style={styles.summaryDate}>{props.date}</Text>
            </View>
            <Button
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(!showDetails);
                }}
            />
            {showDetails && (
                <View style={styles.orderDetails}>
                    {props.items.map((currentItem) =>
                        <CartItem
                            key={currentItem.productId}
                            productTitle={currentItem.productTitle}
                            productQuantity={currentItem.quantity}
                            productSumPrice={currentItem.totalSum}
                        />
                    )}
                </View>
            )}
        </View>
    );
}



//StyleSheet ===============================================================================================================
const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: '2.5%',
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10
    },
    summaryTotalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    summaryDate: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    orderDetails: {
        width: '100%'
    }
});
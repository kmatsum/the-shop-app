//React Imports
import React from 'react';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity } from 'react-native';
//Expo Imports
import { Ionicons } from '@expo/vector-icons';



export default function CartItem(props) {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.subtitleStyle}>{props.productQuantity} </Text>
                <Text numberOfLines={1} style={styles.titleStyle}>{props.productTitle}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.titleStyle}>${props.productSumPrice.toFixed(2)}</Text>
                {props.deletable && (
                    <View style={styles.deleteButton}>
                        <TouchableOpacity onPress={props.onRemove}>
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                                size={23}
                                color='red'
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        marginHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        width: '55%',
        flexDirection: 'row',
        paddingRight: 15
    },
    subtitleStyle: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    titleStyle: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    buttonContainer: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5
    },
    deleteButton: {
        marginLeft: 20
    }
});
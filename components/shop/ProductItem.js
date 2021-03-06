//React Import
import React from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
//Custom Componenet Imports
import Card from '../UI/Card';



//Main Component Function ==================================================================================================
export default function ProductItem(props) {
    //Create a way for TouchableNativeFeedback to be used on supporting Android devices.
    //By default, we will use TouchableOpacity
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.container}>
            <TouchableComponent onPress={props.onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: props.imageUrl }}
                        />
                    </View>
                    <View style={styles.productDetails}>
                        <Text style={styles.title} >{props.title}</Text>
                        <Text style={styles.price} >${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableComponent>
        </Card>
    );
}

//Styling
const styles = StyleSheet.create({
    container: {
        height: 300,
        margin: '2.5%',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    productDetails: {
        alignItems: 'center',
        height: '15%',
    },
    title: {
        fontSize: 18,
        marginVertical: 5,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});
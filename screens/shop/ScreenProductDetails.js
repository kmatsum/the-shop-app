//React Imports
import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    Button
} from 'react-native';
//Redux
import { useSelector } from 'react-redux'
//Constant Imports
import Colors from '../../constants/Colors';



//Navigation Options (For Header Styling and titles)
ScreenProductDetails.navigationOptions = (navigationData) => {
    return {
        headerTitle: navigationData.navigation.getParam('productTitle'),
    };
}



//Main Component Function ==================================================================================================
export default function ScreenProductDetails(props) {
    //Extract the Product ID from the Route Parameters
    const currentProductId = props.navigation.getParam('productId');
    //Get the matching Product Object from Redux using 'find()'
    const selectedProduct = useSelector((state) => state.products.availableProducts.find((currProd) => currProd.id === currentProductId));

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Add to Cart'
                        color={Colors.primary}
                        onPress={() => { }}
                    />
                </View>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    );
}

//Styling
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        width: '100%',
        height: 300
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: '2.5%',
        fontFamily: 'open-sans'
    }
});
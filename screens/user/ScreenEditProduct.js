//React Imports
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
} from 'react-native';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../redux/action/productActions';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Component Imports
import HeaderButton from '../../components/UI/HeaderButton';



//Navigation Options =======================================================================================================
ScreenEditProduct.navigationOptions = (navigationData) => {
    //Fetch and save the submitHandler Function from navigationData
    const submitFunction = navigationData.navigation.getParam('submit');

    return {
        headerTitle: navigationData.navigation.getParam('productId') ? 'Edit Product' : 'Add New Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFunction}
                    iconSize={23}
                />
            </HeaderButtons>
        ),
    }
};



//Main Function ============================================================================================================
export default function ScreenEditProduct(props) {
    const dispatch = useDispatch();

    //Get the ProductId from React-Navigation Parameters
    const productId = props.navigation.getParam('productId');
    //Retrieve the product from Redux (Will return UNDEFINED if no productId is provided)
    const editedProduct = useSelector((state) =>
        state.products.userProducts.find((product) =>
            product.id === productId
        )
    );

    //Create useState variables and using the values from 'editedProduct' when it is defined (When in Edit Product Mode)
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    //Create a Submit Handler Function to pass through React-Navigation as Params
    const submitHandler = useCallback(() => {
        //Check to see if the 'editedProduct' object exists. If it EXISTS, we are UPDATING a product
        if (editedProduct) {
            //Dispatch the Edit Product action
            dispatch(productActions.updateProduct(
                productId,
                title,
                description,
                imageUrl,
            ));
        } else {
            //Dispatch the Create Product action
            dispatch(productActions.createProduct(
                title,
                description,
                imageUrl,
                +price
            ));
        }

        //After the Create or Update of the Product, go back to the previous screen
        props.navigation.goBack();
    }, [dispatch, productId, title, description, imageUrl, price]);

    /* useEffect() to pass the submitHandler function to the Navigation Params (Only when submitHandler is changed, which
     is just once, since nothing else is changing about the function) */
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);



    //Return JSX Component =================================================================================================
    return (
        <ScrollView>
            <View style={styles.formConainter}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Image URL:</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                    />
                </View>
                {editedProduct ? null :
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price:</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                        />
                    </View>}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
}



//StyleSheet ===============================================================================================================
const styles = StyleSheet.create({
    formConainter: {
        margin: '5%'
    },
    inputContainer: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});
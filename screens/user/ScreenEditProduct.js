//React Imports
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    StyleSheet,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
    Alert
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



//formReducer Constants
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
//Create a formReducer
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        //Create an object which changes the data for inputValues
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        //Create an object which changes the data for inputValidity
        const updatedValidity = {
            ...state.inputValidity,
            [action.input]: action.isValid
        }
        //Loop through the array and return true if all validities are true
        let updatedFormIsValid = true;
        for (const key in updatedValidity) {
            //Creates a Boolean switch which cannot be unflipped
            updatedFormIsValid = updatedFormIsValid && updatedValidity[key];
        }

        //Return the updated the State Store
        return {
            inputValues: updatedValues,
            inputValidity: updatedValidity,
            formIsValid: updatedFormIsValid
        };
    }

    //If the if statement is not reached, just return the state
    return state;
}



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


    //Using Array Destructuring Syntax, split the things that useReducer returns into 'formState' and 'dispatchFromState'
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : ''

        },
        inputValidity: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });


    //Create a Submit Handler Function to pass through React-Navigation as Params
    const submitHandler = useCallback(() => {
        //Input validation check
        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong input!',
                'Please check the errors.',
                [
                    { text: 'okay' }
                ]
            );
            return;
        }
        //Check to see if the 'editedProduct' object exists. If it EXISTS, we are UPDATING a product
        if (editedProduct) {
            //Dispatch the Edit Product action
            dispatch(productActions.updateProduct(
                productId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
            ));
        } else {
            //Dispatch the Create Product action
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ));
        }

        //After the Create or Update of the Product, go back to the previous screen
        props.navigation.goBack();
    }, [dispatch, productId, formState]);

    /* useEffect() to pass the submitHandler function to the Navigation Params (Only when submitHandler is changed, which
     is just once, since nothing else is changing about the function) */
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);



    //Title Change Handler - Validation
    const titleChangedHandler = (inputId, text) => {
        //Create a validity variable
        let isValid = false;
        //Check if the trimmed text is not empty
        if (text.trim().length > 0) {
            isValid = true
        }
        //Dispatch the reducer, passing an Action Object containing an action type and some data
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputId
        });
    };



    //Return JSX Component =================================================================================================
    return (
        <ScrollView>
            <View style={styles.formConainter}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={(text) => titleChangedHandler('title', text)}
                        autoCapitalize='words'
                        autoCorrect
                        returnKeyType='next'
                    />
                    {!formState.inputValidity.title && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Image URL:</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={(text) => titleChangedHandler('imageUrl', text)}
                        returnKeyType='next'
                    />
                </View>
                {editedProduct ? null :
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price:</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.price}
                            onChangeText={(text) => titleChangedHandler('price', text)}
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                        />
                    </View>}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={(text) => titleChangedHandler('description', text)}
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
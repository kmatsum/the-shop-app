//React Imports
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    StyleSheet,
    Platform,
    ScrollView,
    View,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator
} from 'react-native';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../redux/action/productActions';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Component Imports
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import { Colors } from 'react-native/Libraries/NewAppScreen';



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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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



    //ERROR HANDLING ALERT =====
    useEffect(() => {
        if (error) {
            Alert.alert('An error occured...', error, [{ text: 'Okay' }]);
        }
    }, [error])



    //HANDLER FUNCTIONS ===========================================================================
    //Create a Submit Handler Function to pass through React-Navigation as Params
    const submitHandler = useCallback(async () => {
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

        //Prepare the 'Loading' states
        setError(null);
        setIsLoading(true);

        //Check to see if the 'editedProduct' object exists. If it EXISTS, we are UPDATING a product
        try {
            if (editedProduct) {
                //Dispatch the Edit Product action
                await dispatch(productActions.updateProduct(
                    productId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                ));
            } else {
                //Dispatch the Create Product action
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                ));
            }

            //After the Create or Update of the Product, go back to the previous screen
            props.navigation.goBack();

        } catch (err) {
            setError(err.message);
        }

        //Set isLoading to false to indicate that the Loading is finished
        setIsLoading(false);
    }, [dispatch, productId, formState]);

    /* useEffect() to pass the submitHandler function to the Navigation Params (Only when submitHandler is changed, which
     is just once, since nothing else is changing about the function) */
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);



    //Title Change Handler - Validation
    const inputChangeHandler = useCallback((inputId, inputValue, inputValidity) => {
        //Dispatch the reducer, passing an Action Object containing an action type and some data
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputId
        });
    }, [dispatchFormState]);
    //END OF: HANDLER FUNCTIONS ===================================================================



    //Return JSX Component =================================================================================================
    //LOADING VIEW
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        );
    }



    //DEFAULT VIEW
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.formConainter}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title!'
                        autoCapitalize='words'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />

                    <Input
                        id='imageUrl'
                        label='Image Url'
                        errorText='Please enter a valid Image Url!'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />

                    {editedProduct ? null : (
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter a valid Price!'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}

                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}



//StyleSheet ===============================================================================================================
const styles = StyleSheet.create({
    formConainter: {
        margin: '5%'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
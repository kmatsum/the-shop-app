//React Imports
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
//Redux Imports
import * as authActions from '../../redux/action/authActions';
//Constant Imports
import Colors from '../../constants/Colors';
//Custom Component Imports
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';



//Navigation Options =======================================================================================================
ScreenAuth.navigationOptions = {
    headerTitle: 'Please login'
}



//Internal Redux Reducer ===================================================================================================
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
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
export default function ScreenAuth(props) {
    //Internal State Management =====
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    //React-Redux dispatch function constant
    const dispatch = useDispatch();

    //Instantiation of the Form State (Internal Redux Reducer) =====
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidity: {
            email: false,
            password: false,
        },
        formIsValid: false
    });
    //inputChangeHandler Function to be passed into 'Input' componnents =====
    const inputChangeHandler = useCallback((inputId, inputValue, inputValidity) => {
        //Dispatch the reducer, passing an Action Object containing an action type and some data
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputId
        });
    }, [dispatchFormState]);



    //========== Event Handlers ==========

    //Alert Effect =====
    useEffect(() => {
        if (error) {
            Alert.alert('An error has occurred', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    //signupHandler Function for authentication =====
    const authHandler = async () => {
        //Create an action variable
        let action;
        //Define 'action' based on if we are in Sign Up Mode
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password,
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password,
            );
        }
        setIsLoading(true);
        setError(null);
        //Dispatch with the action variable
        try {
            await dispatch(action);
            //After the 'Login' dispatch promise is complete, navigate to the shop
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };



    //Return JSX Component =================================================================================================
    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior='padding'
            keyboardVerticalOffset={50}
        >
            <LinearGradient
                colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='Email'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText='Please enter a valid password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ?
                                <ActivityIndicator
                                    size='small'
                                    color={Colors.primary}
                                />
                                :
                                <Button
                                    title={isSignup ? 'Sign Up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={authHandler}
                                />}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={() => {
                                    setIsSignup(!isSignup);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}



//StyleSheet ===============================================================================================================
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
    }
});
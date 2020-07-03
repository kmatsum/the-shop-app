//React Imports
import React, { useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';



//React-Store Action Constants
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
//========== React-Store Reducer ==========
const inputReducer = (state, action) => {
    switch (action.type) {
        //INPUT_CHANGE ACTION =====
        case INPUT_CHANGE: {
            //Return the old state with changes
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        } //END OF: INPUT_CHANGE =====

        //INPUT_BLUR ACTION =====
        case INPUT_BLUR: {
            return {
                ...state,
                touched: true
            }
        } //END OF: INPUT_BLUR =====

        //DEFAULT ACTION =====
        default: {
            return state;
        }
    }
};



//Main Function ============================================================================================================
export default function Input(props) {
    //Create a new React-Reducer for this component
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid ? props.initiallyValid : '',
        touched: false
    });

    //Object Destructuring
    const { onInputChange, id } = props;
    //useEffect to have the inputChange function run after every re-render of the Component (When text is changed)
    useEffect(() => {
        //Pass the data to the parent function using the function brought through props
        onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, onInputChange, id]);

    //Text Changed Handler for when the TextInput value changes
    const textChangedHandler = (text) => {
        //Input Validation code
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        //Dispatch the React-Store Reducer and send Action Object
        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid
        });
    }

    //lostFocusHandler for when the Input is escaped from (User is done editing)
    const lostFocusHander = () => {
        dispatch({
            type: INPUT_BLUR
        });
    }



    //Return JSX Component =================================================================================================
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={(text) => textChangedHandler(text)}
                onBlur={lostFocusHander}
            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
}



const styles = StyleSheet.create({
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
    },
    errorContainer: {
        margin: 5,
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    },
});
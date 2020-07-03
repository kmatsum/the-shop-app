//React Imports
import React, { useEffect } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    AsyncStorage
} from 'react-native';
//Redux Imports
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/action/authActions';
//Constant Imports
import Colors from '../constants/Colors';



//Main Function ============================================================================================================
export default function (props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            //Using Async/Await, get the userData that is possibly stored
            const userData = await AsyncStorage.getItem('userData');

            //If there is no userData in storage, navigate to the Auth Screen
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }

            //Create a JSON Object from the JSON String we got from 'userData'
            const transformedData = JSON.parse(userData);
            //Using Object Desctructuring, get the data
            const { token, userId, expiryDate } = transformedData;

            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            //Calculate expiration time
            const expirationTime = expirationDate.getTime() - new Date().getTime();

            dispatch(authActions.authenticate(userId, token, expirationTime));
            props.navigation.navigate('Shop');
        };

        tryLogin();
    }, [dispatch])


    //Return JSX Component ========================================================================
    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    );
}



//StyleSheet ===============================================================================================================
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
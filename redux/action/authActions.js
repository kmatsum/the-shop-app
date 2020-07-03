import { AsyncStorage } from 'react-native';

//ACTION TYPES ====================================================================================
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';

let timer;



//ACTION: AUTHENTICATE ============================================================================
export const authenticate = (userId, token, expiryTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            userId: userId,
            token: token,
        })
    }
} //END OF: AUTHENTICATE ==========================================================================



//ACTION: SIGNUP ==================================================================================
export const signup = (email, password) => {
    //Use Redux-Thunk to create an Asynchronous Action Function
    return async (dispatch) => {
        //Create an HTTP POST method to create a new account
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCflR2eRotBWNRDUZ9MYkkOuwfMLZJ7s6c', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        //Check if the response was an Status code 200 (ok) and if not, handle any errors
        if (!response.ok) {
            //Store the Response data after awaiting the Unpack
            const errorResponseData = await response.json();
            //Copy the error message from the response data
            const errorId = errorResponseData.error.message;

            //Create a String variable to hold our error message
            let message = 'Something went wrong...';
            //Change the message if the 'Error Message' that was returned from Firebase matches pre-configured errors
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email is already registered!';
            }
            //Throw the error with the configured message
            throw new Error(message);
        }

        const responseData = await response.json();

        //Dispatch Original Action
        dispatch(
            authenticate(
                responseData.localId,
                responseData.idToken,
                parseInt(responseData.expiresIn) * 1000
            )
        );

        //Create an token-expiration data
        const expirationDate = new Date(new Date().getTime() + (parseInt(responseData.expiresIn) * 1000));
        //Save the User Data to hard-storage
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
} //END OF: SIGNUP ================================================================================




//ACTION: LOGIN ===================================================================================
export const login = (email, password) => {
    //Use Redux-Thunk to create an Asynchronous Action Function
    return async (dispatch) => {
        //Create an HTTP POST method to create a new account
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCflR2eRotBWNRDUZ9MYkkOuwfMLZJ7s6c', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        //Check for an 'ok' reponse
        if (!response.ok) {
            //Store the Response data after awaiting the Unpack
            const errorResponseData = await response.json();
            //Copy the error message from the response data
            const errorId = errorResponseData.error.message;

            //Create a String variable to hold our error message
            let message = 'Something went wrong...';
            //Change the message if the 'Error Message' that was returned from Firebase matches pre-configured errors
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'The password is incorrect!'
            }
            //Throw the error with the configured message
            throw new Error(message);
        }

        const responseData = await response.json();

        //Dispatch Original Action
        dispatch(
            authenticate(
                responseData.localId,
                responseData.idToken,
                parseInt(responseData.expiresIn) * 1000
            )
        );

        //Create an token-expiration data
        const expirationDate = new Date(new Date().getTime() + (parseInt(responseData.expiresIn) * 1000));
        //Save the User Data to hard-storage
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
} //END OF: LOGIN =================================================================================



//ACTION: LOGOUT ==================================================================================
export const logout = () => {
    //Clear any Timeout Timers
    clearLogoutTimer();
    //Clear the user authentication data in storage
    AsyncStorage.removeItem('userData');
    //Return an React-Redux action object
    return {
        type: LOGOUT,
    };
} //END OF: LOGOUT ================================================================================





//FUCNTIONS =======================================================================================
//ASYNC STORAGE -----
function saveDataToStorage(token, userId, expirationDate) {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
}

//TOKEN EXPIRATION FUNCTION -----
function setLogoutTimer(expirationTime) {
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

//CLEAR LOGOUT TIMER FUNCTION -----
function clearLogoutTimer() {
    if (timer) {
        clearTimeout(timer);
    }
}

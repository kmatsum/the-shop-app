//Redux Action Constant Imports
import { AUTHENTICATE, LOGOUT } from '../action/authActions';



//Initial State =====
const initialState = {
    token: null,
    userId: null
}



//Authentication Reducer Function =================================================================
export default function (state = initialState, action) {
    //action.type Switch Statement =====
    switch (action.type) {
        
        //ACTION: LOGIN =====
        case AUTHENTICATE: {
            //Return the updated state of our authentication data
            return {
                token: action.token,
                userId: action.userId
            };
        } //END OF: LOGIN -----

        //ACTION: LOGOUT =====
        case LOGOUT: {
            //Return the updated state of our authentication data
            return initialState;
        } //END OF: LOGOUT -----
         
        // //ACTION: SIGNUP =====
        // case SIGNUP: {
        //     //Return the updated state of our authentication data
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     };
        // } //END OF: SIGNUP -----

        default: {
            return state;
        }
    }
}
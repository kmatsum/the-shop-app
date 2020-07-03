//Order Object Model Imports
import Order from '../../data/models/order';
//Redux Action Imports
import {
    SET_ORDERS,
    ADD_ORDER,
} from '../action/orderActions';



//Initial Redux-Store State (On App Init)
const initialState = {
    //Just a simple array of orderObjects (Empty when initialized)
    orders: []
};



//Redux Reducer Function ===================================================================================================
export default (state = initialState, action) => {
    switch (action.type) {

        //ACTION: SET_ORDERS =====
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            };
        } //END OF: SET_ORDERS =====

        //ACTION: ADD_ORDER =====
        case ADD_ORDER: {
            //Create a new Order Object, passing all needed constructor data
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.totalAmount,
                action.orderData.date
            );

            //Add new Order to the Redux-State that is stored
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        } //END OF: ADD_ORDER =====



        //DEFAULT ACTION =====
        default: {
            return state;
        }
    }
};
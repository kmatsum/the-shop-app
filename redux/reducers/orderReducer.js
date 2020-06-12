//Order Object Model Imports
import Order from '../../data/models/order';
//Redux Action Imports
import { ADD_ORDER } from '../action/orderActions';



//Initial Redux-Store State (On App Init)
const initialState = {
    //Just a simple array of orderObjects (Empty when initialized)
    orders: []
};



//Redux Reducer Function ===================================================================================================
export default (state = initialState, action) => {
    switch (action.type) {

        //ACTION: ADD_ORDER =====
        case ADD_ORDER: {
            //Create a new Order Object, passing all needed constructor data
            const newOrder = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.totalAmount,
                new Date()
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
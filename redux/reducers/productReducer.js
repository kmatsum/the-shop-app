//Import the Dummy Data
import PRODUCTS from '../../data/dummy-data';
//Import Redux Aciton
import { DELETE_PRODUCT } from '../action/productActions';



//Initial Redux-Store State (On App Init)
const initialState = {
    availableProducts: PRODUCTS,
    userProducts: (PRODUCTS.filter((product) => product.ownerId === 'u1'))
};



//Redux Reducer Function ===================================================================================================
export default (state = initialState, action) => {
    switch (action.type) {

        //ACTION: DELETE_PRODUCT =====
        case DELETE_PRODUCT: {
            //Return the new state, filtering the Product Arrays without the removed product
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId),
                userProducts: state.availableProducts.filter(product => product.id !== action.productId)
            };
        } //END OF: DELETE_PRODUCT =====
        


        //DEFAULT ACITON
        default: {
            return state;
        }
    }
};
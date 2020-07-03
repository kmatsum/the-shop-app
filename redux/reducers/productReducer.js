//Import the Dummy Data
import PRODUCTS from '../../data/dummy-data';
//Import the Data Object Model
import Product from '../../data/models/product';
//Import Redux Aciton
import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    SET_PRODUCTS
} from '../action/productActions';



//Initial Redux-Store State (On App Init)
const initialState = {
    availableProducts: [],
    userProducts: []
};



//Redux Reducer Function ===================================================================================================
export default (state = initialState, action) => {
    switch (action.type) {

        //ACITON: SET_PRODUCTS =====
        case SET_PRODUCTS: {
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts
            };
        } //END OF: SET_PRODUCTS =====

        //ACTION: CREATE_PRODUCT =====
        case CREATE_PRODUCT: {
            //Create a new Product object
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            //Return the new state using concat to add the newProduct
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        } //END OF: CREATE_PRODUCT =====



        //ACTION: UPDATE_PRODUCT =====
        case UPDATE_PRODUCT: {
            //Grab the index of the Product we are Updating using our productID
            const availableProductIndex = state.availableProducts.findIndex(
                (product) => product.id === action.productId
            );
            const userProductIndex = state.userProducts.findIndex(
                (product) => product.id === action.productId
            );

            //Create a new Product Object using the Data Object Model
            const updatedProduct = new Product(
                action.productId,
                state.userProducts[userProductIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[userProductIndex].price,
            );

            //Create a new 'updatedUserProducts' array that grabs all values, then changes the value at userProductIndex
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[userProductIndex] = updatedProduct;

            //Create a new 'updatedAvailableProducts' array that grabs all values, then changes the value at availableProductIndex
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            //Return the new state, passing the updated arrays
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };
        } //END OF: UPDATE_PRODUCT =====



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
//Object Model Imports
import Product from '../../data/models/product';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';



//SET_PRODUCTS =====
export function fetchProducts() {
    return async (dispatch, getState) => {
        //Retreive Authentication Token and userId for the current user
        const userId = getState().authentication.userId
        //Surround Logic with a Try/Catch to handle any loading errors that we may have. (ie. Internet, Unresponsive Databse, etc)
        try {
            //Create a HTTP fetch Request
            const response = await fetch('https://rn-shop-app-a916d.firebaseio.com/products.json');

            //Check for errors
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            //Unpack the Response Data, but we need to await for it to unpack everything before moving on
            const responseData = await response.json();

            //reponseData will return a JavaScript Object with all of Products in it, so we need to convert it to a usable array
            const loadedProducts = [];
            //Loop through the responseData JavaScript Object Array
            for (const key in responseData) {
                loadedProducts.push(new Product(
                    key,
                    responseData[key].ownerId,
                    responseData[key].title,
                    responseData[key].imageUrl,
                    responseData[key].description,
                    responseData[key].price
                ));
            }

            //Dispatch the aciton with the Aciton-Type, as well as the Products Array
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter((product) => product.ownerId === userId)
            });
        } catch (error) {
            //Handle the error
            throw error;
        }
    };
} //END OF: SET_PRODUCTS =====



//CREATE_PRODUCT =====
export function createProduct(title, description, imageUrl, price) {
    return async (dispatch, getState) => {
        //REDUX-THUNK ASYNC CODE =====
        //Retreive Authentication Token and userId for the current user
        const token = getState().authentication.token;
        const userId = getState().authentication.userId

        const response = await fetch(`https://rn-shop-app-a916d.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        });

        //Unpack the Response Data, but we need to await for it to unpack everything before moving on
        const responseData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: responseData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }
        });
    };
} //END OF: CREATE_PRODUCT =====



//UPDATE_PRODUCT =====
export function updateProduct(id, title, description, imageUrl) {
    return async (dispatch, getState) => {
        //REDUX-THUNK ASYNC CODE =====
        //Retreive Authentication Token for the current user
        const token = getState().authentication.token;

        //Use an HTTP fetch request to target the specific product ID, and PATCH any of the value-pairs that we give Firebase
        const response = await fetch(`https://rn-shop-app-a916d.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });

        //Catch and Throw errors
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            productId: id,
            productData: {
                title,
                description,
                imageUrl,
            }
        });
    }
} //END OF: UPDATE_PRODUCT =====



//DELETE_PRODUCT =====
export function deleteProduct(productId) {
    return async (dispatch) => {
        //REDUX-THUNK ASYNC CODE =====
        //Use an HTTP fetch request to delete the specific product ID from Firebase
        const response = await fetch(`https://rn-shop-app-a916d.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
        });

        //Catch and Throw errors
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: DELETE_PRODUCT,
            productId: productId
        });
    }
} //END OF: DELETE_PRODUCT =====
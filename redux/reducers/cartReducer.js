import React from 'react';
//CartItem Object Model Import
import CartItem from '../../data/models/cart-item';
//Redux Action Imports
import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/cartActions";
import { ADD_ORDER } from '../action/orderActions';
import { DELETE_PRODUCT } from '../action/productActions';



//Initial Redux-Store State (On App Init)
const initialState = {
    cartItems: {},
    totalCartPrice: 0,
};


//Redux Reducer Function ===================================================================================================
export default (state = initialState, action) => {
    switch (action.type) {

        //ACTION: ADD_TO_CART =====
        case ADD_TO_CART: {
            //Variables that we will need to create a CartItem Object
            const inputProduct = action.product;
            const productPrice = inputProduct.price;
            const productTitle = inputProduct.title;

            //Create a new CartItem variable
            let addThisCartItem;

            //Determine if the item being added is already in the cart (We will only need to increase the quantity if it is)
            if (state.cartItems[inputProduct.id]) {
                //Create a new CartItem Object, updating the values of the item in the cart
                addThisCartItem = new CartItem(
                    state.cartItems[inputProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.cartItems[inputProduct.id].totalSum + productPrice
                );
            } else { //If the item is not already in the cart, instantiate a new object to add to the data
                addThisCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }

            //Return the new State
            /* Once we crate the newCartObject, we need to be able to change that part of the Redeux-State, then return the state.
                We do this by speading the object, like below, and setting new values to the JavaScript Object Array
                
                We can create a DYNAMIC KEY NAME by using '[]:', being able to create or access Dynamic Properties */
            return {
                ...state,
                cartItems: { ...state.cartItems, [inputProduct.id]: addThisCartItem },
                totalCartPrice: state.totalCartPrice + productPrice
            };
        } //END OF: ADD_TO_CART =====



        //ACTION: REMOVE_FROM_CART =====
        case REMOVE_FROM_CART: {
            const selectedCartItem = state.cartItems[action.productId];

            let updatedCartItems;

            if (selectedCartItem.quantity > 1) { //Reduce the quantity and product Sum
                const updatedItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.totalSum - selectedCartItem.productPrice
                );

                updatedCartItems = { ...state.cartItems, [action.productId]: updatedItem }
            } else { //Delete the Product from the cart
                updatedCartItems = { ...state.cartItems };
                delete updatedCartItems[action.productId];
            }

            return {
                ...state,
                cartItems: updatedCartItems,
                totalCartPrice: state.totalCartPrice - selectedCartItem.productPrice
            };

        } //END OF: REMOVE_FROM_CART =====



        //ACTION: ADD_ORDER =====
        case ADD_ORDER: {
            //When an Order is Added, we need to clear the Cart, just using the initialState, an empty cart, is fine
            return (
                initialState
            );
        } //END OF: ADD_ORDER =====



        //ACTION: DELETE_PRODUCT =====
        case DELETE_PRODUCT: {
            //If the Product with the ProductId is NOT in the cart, do nothing
            if (!state.cartItems[action.productId]) {
                return state;
            }

            //Put current state into variables
            const updatedItems = { ...state.cartItems };
            const itemTotal = state.cartItems[action.productId].totalSum;
            //Delete the Object Property with the ProductId from the Object 
            delete updatedItems[action.productId];

            //Return the new state after removing the Products and subtracting their price from the totalCartPrice
            return {
                ...state,
                cartItems: updatedItems,
                totalCartPrice: state.totalCartPrice - itemTotal
            };
        } //END OF: DELETE_PRODUCT =====



        //DEFAULT ACTION =====
        default: {
        }
    }
    return state;
};
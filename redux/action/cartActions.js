export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

//ADD_TO_CART =====
export function addToCart(product) {
    return { type: ADD_TO_CART, product: product }
}

//REMOVE_FROM_CART =====
export function removeFromCart(productId) {
    return { type: REMOVE_FROM_CART, productId: productId }
}
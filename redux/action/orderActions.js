export const ADD_ORDER = 'ADD_ORDER';

//ADD_ORDER =====
export function addOrder (cartItems, totalAmount) {
    //Return an Object (Interpreted by Redux as the ACTION OBJECT, which holds the ACTION_TYPE and any ACITON_DATA)
    return {
        type: ADD_ORDER,
        orderData: {
            items: cartItems,
            totalAmount: totalAmount,
        },
    }
}
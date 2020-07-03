import Order from '../../data/models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

//SET_ORDERS =====
export function fetchOrders() {
    return async (dispatch, getState) => {
        //Retreive Authentication Token and userId for the current user
        const userId = getState().authentication.userId

        try {
            //Use a HTTP GET Request to get Orders
            const response = await fetch(`https://rn-shop-app-a916d.firebaseio.com/orders/${userId}.json`);
            //Check for errors
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            //Unpack the Response Data, but we need to await for it to unpack everything before moving on
            const responseData = await response.json();

            //reponseData will return a JavaScript Object with all of Products in it, so we need to convert it to a usable array
            const loadedOrders = [];
            //Loop through the responseData JavaScript Object Array
            for (const key in responseData) {
                loadedOrders.push(new Order(
                    key,
                    responseData[key].cartItems,
                    responseData[key].totalAmount,
                    new Date(responseData[key].date)
                ));
            }

            //Request a React-Redux Dispatch
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            });
        } catch (error) {
            throw error;
        }
    }
} //END OF: SET_ORDERS =====

//ADD_ORDER =====
export function addOrder(cartItems, totalAmount) {
    //Return an Object (Interpreted by Redux as the ACTION OBJECT, which holds the ACTION_TYPE and any ACITON_DATA)
    return async (dispatch, getState) => {
        //Retreive Authentication Token and userId for the current user
        const token = getState().authentication.token;
        const userId = getState().authentication.userId
        const orderDate = new Date();

        //HTTP Request =====
        const response = await fetch(`https://rn-shop-app-a916d.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: orderDate.toISOString()
            })
        });

        //Throw any erros that we have
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        //Collect the responseData that we get from the FireBase REST-API Response
        const responseData = await response.json();

        //Create the LOCAL dispatch
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: responseData.name,
                items: cartItems,
                totalAmount: totalAmount,
                date: orderDate
            },
        });
    }
}
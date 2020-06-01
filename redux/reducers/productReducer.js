//Import the Dummy Data
import PRODUCTS from '../../data/dummy-data';

//Initial state of the application when the program opens
const initialState = {
    availableProducts: PRODUCTS,
    useProducts: (PRODUCTS.filter((product) => { product.ownerId === 'u1' }))
};

export default (state = initialState, action) => {
    
    return state;
};
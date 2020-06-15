export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

//CREATE_PRODUCT =====
export function createProduct(title, description, imageUrl, price) {
    return {
        type: CREATE_PRODUCT,
        productData: {
            title,
            description,
            imageUrl,
            price
        }
    };
}

//UPDATE_PRODUCT =====
export function updateProduct(id, title, description, imageUrl) {
    return {
        type: UPDATE_PRODUCT,
        productId: id,
        productData: {
            title,
            description,
            imageUrl,
        }
    };
}

//DELETE_PRODUCT =====
export function deleteProduct(productId) {
    return {
        type: DELETE_PRODUCT,
        productId: productId
    };
}
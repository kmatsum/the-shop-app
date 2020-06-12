export const DELETE_PRODUCT = 'DELETE_PRODUCT';

//DELETE_PRODUCT =====
export function deleteProduct(productId) {
    return {
        type: DELETE_PRODUCT,
        productId: productId
    }
}
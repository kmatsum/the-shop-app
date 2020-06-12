export default class CartItem {
    constructor(quantity, productPrice, productTitle, totalSum) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.totalSum = totalSum;
    }
}
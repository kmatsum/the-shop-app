//Moment Imports
// import * as moment from 'moment';
import moment from 'moment';

export default class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    //Add a Method (A getter) =====
    get readableDate() {
        // return this.date.toLocaleDateString('en-EN', {
        //     year: 'numeric',
        //     month: 'long',
        //     date: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit',
        // });
        return moment(this.date).format('MMMM Do YYY, hh:mm');
    }
}
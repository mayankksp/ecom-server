const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

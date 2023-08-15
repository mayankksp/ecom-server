const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    transactionId: String,
    paymentMethod: String,
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Failed'],
        default: 'Pending'
    },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;

const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    code: String,
    discountAmount: Number,
    discountPercentage: Number,
    validityPeriod: Date,
    conditions: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;

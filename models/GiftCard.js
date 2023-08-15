const mongoose = require('mongoose');

const GiftCardSchema = new mongoose.Schema({
    code: String,
    balance: Number,
    expirationDate: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const GiftCard = mongoose.model('GiftCard', GiftCardSchema);

module.exports = GiftCard;

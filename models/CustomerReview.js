const mongoose = require('mongoose');

const CustomerReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String,
    rating: Number,
    comment: String,
    images: [String],
    reviewDate: {
        type: Date,
        default: Date.now
    }
});

const CustomerReview = mongoose.model('CustomerReview', CustomerReviewSchema);

module.exports = CustomerReview;

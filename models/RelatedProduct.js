const mongoose = require('mongoose');

const RelatedProductSchema = new mongoose.Schema({
    relatedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    mainProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

const RelatedProduct = mongoose.model('RelatedProduct', RelatedProductSchema);

module.exports = RelatedProduct;

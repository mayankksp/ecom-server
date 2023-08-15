const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    description: String,
    imageUrl: String,
    price: Number,
    category: String,
    productName: String,
    stock: Number,
    weight: Number,
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    manufacturer: String,
    brand: String,
    ratings: [Number],
    averageRating: Number,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

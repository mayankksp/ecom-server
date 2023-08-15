const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    supplier: String,
    restockDate: Date,
    minimumStockAlert: Number,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;

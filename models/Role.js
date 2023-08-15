const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
}, {
    timestamps: true  // Adds createdAt and updatedAt fields
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
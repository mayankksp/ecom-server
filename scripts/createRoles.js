require('dotenv').config();  // Load environment variables

const mongoose = require('mongoose');
const Role = require('../models/Role');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createRoles = async () => {
    const roles = [
        { name: 'Admin', description: 'Full access to all resources', isDefault: false },
        { name: 'Customer', description: 'Can view products and place orders', isDefault: true },
        { name: 'Vendor', description: 'Can manage own products and view related orders', isDefault: false },
        { name: 'Support', description: 'Can assist customers with issues', isDefault: false },
        { name: 'Warehouse', description: 'Can manage inventory and process orders for shipment', isDefault: false },
        { name: 'Marketing', description: 'Can create and manage promotional campaigns', isDefault: false },
        { name: 'Finance', description: 'Can view and manage financial transactions', isDefault: false },
        { name: 'Content', description: 'Can update product descriptions, images, and manage content', isDefault: false }
    ];

    for (const role of roles) {
        const existingRole = await Role.findOne({ name: role.name });
        if (!existingRole) {
            const newRole = new Role(role);
            await newRole.save();
            console.log(`Role ${role.name} created successfully!`);
        } else {
            console.log(`Role ${role.name} already exists.`);
        }
    }

    mongoose.connection.close();
};

createRoles();
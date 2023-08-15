require('dotenv').config();  // Load environment variables

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createSuperAdmin = async () => {
    const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, parseInt(process.env.SALT_ROUNDS));

    const superAdmin = new User({
        firstName: process.env.SUPER_ADMIN_FIRST_NAME,
        lastName: process.env.SUPER_ADMIN_LAST_NAME,
        username: process.env.SUPER_ADMIN_USERNAME,
        password: hashedPassword,
        email: process.env.SUPER_ADMIN_EMAIL,
        emailVerified: true,
        isSuperAdmin: true
    });

    await superAdmin.save();
    console.log('Super Admin created successfully!');
    mongoose.connection.close();
};

createSuperAdmin();
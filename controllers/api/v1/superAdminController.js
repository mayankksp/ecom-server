const Role = require('../../../models/Role');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

exports.createAdmin = async (req, res) => {
    console.log(req.body);
    try {
        const { firstName, lastName, username, password, email } = req.body;
        
        // Check if user already exists
        let user = await User.findOne({ 
            $or: [
                { username: username },
                { email: email }
            ]
        });
        
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        
        // Find the 'Admin' role
        const adminRole = await Role.findOne({ name: 'Admin' });
        if (!adminRole) {
            return res.status(400).json({
                success: false,
                message: "Admin role not found"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        
        // Create a new admin user with the 'Admin' role
        const newAdmin = new User({ 
            firstName, 
            lastName, 
            username, 
            password: hashedPassword,
            email, 
            emailVerified: true, 
            isSuperAdmin: false,
            role: adminRole._id
        });
        
        // Save the new admin user
        await newAdmin.save();
        
        // Add new admin user ID to the Admin Role's users array
        adminRole.users.push(newAdmin._id);
        await adminRole.save();

        return res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: newAdmin
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getAdmins = async (req, res) => {
    try {
        // Find the 'Admin' role
        const adminRole = await Role.findOne({ name: 'Admin' });
        if (!adminRole) {
            return res.status(400).json({
                success: false,
                message: "Admin role not found"
            });
        }

        // Find users with the 'Admin' role
        const admins = await User.find({ role: adminRole._id }).populate('role');
        
        return res.status(200).json({
            success: true,
            message: "Admins fetched successfully",
            data: admins
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        const admin = await User.findById(id);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }
        await admin.remove();
        return res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
            data: admin
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message

        })
    }
}
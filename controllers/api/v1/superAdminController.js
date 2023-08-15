const Role = require('../../../models/Role');
const User = require('../../../models/User');

exports.createAdmin = async (req, res) => {
    try {
        const { firstName, lastName, username, password, email, emailVerified } = req.body;
        const newAdmin = await User.create({ firstName, lastName, username, password, email, emailVerified });

        return res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: newAdmin
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const newRole = await Role.create({ name });
        return res.status(200).json({
            success: true,
            message: "Role created successfully",
            data: newRole
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ isSuperAdmin: false }).populate('roles');
        return res.status(200).json({
            success: true,
            message: "Admins fetched successfully",
            data: admins
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('users').populate('permissions');
        return res.status(200).json({
            success: true,
            message: "Roles fetched successfully",
            data: roles
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.assignRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const user = await User.findById(userId);
        const role = await Role.findById(roleId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            })
        }
        user.roles.push(role._id);
        await user.save();
        role.users.push(user._id);
        await role.save();
        return res.status(200).json({
            success: true,
            message: "Role assigned successfully",
            data: role
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const { id, firstName, lastName, username, password, email, emailVerified } = req.body;
        const admin = await User.findById(id);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }
        admin.firstName = firstName;
        admin.lastName = lastName;
        admin.username = username;
        admin.password = password;
        admin.email = email;
        admin.emailVerified = emailVerified;
        await admin.save();
        return res.status(200).json({
            success: true,
            message: "Admin updated successfully",
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

exports.updateRole = async (req, res) => {
    try {
        const { id, name } = req.body;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            })
        }
        role.name = name;
        await role.save();
        return res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data: role
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message

        })
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

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.body;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            })
        }
        await role.remove();
        return res.status(200).json({
            success: true,
            message: "Role deleted successfully",
            data: role
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message

        })
    }
}
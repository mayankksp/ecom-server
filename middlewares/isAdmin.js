const User = require('../models/User');

async function isAdmin(req, res, next) {
    try {
        // Assuming req.user.id contains the authenticated user's ID
        const user = await User.findById(req.user.id).populate('roles');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if one of the user's roles is 'Admin'
        const hasAdminRole = user.roles.some(role => role.name === 'Admin');

        if (!hasAdminRole) {
            return res.status(403).json({ msg: 'Access denied. User is not an admin.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = isAdmin;
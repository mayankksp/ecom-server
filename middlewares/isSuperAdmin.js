const User = require('../models/User');

async function isSuperAdmin(req, res, next) {
    try {
        // Assuming req.user.id contains the authenticated user's ID
        const user = await User.findById(req.user.id).populate('roles');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if one of the user's isSuperAdmin property is true
        const isSuperAdmin = user.isSuperAdmin;
    

        if (isSuperAdmin) {
            return res.status(403).json({ msg: 'Access denied. User is not a super admin.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = isSuperAdmin;
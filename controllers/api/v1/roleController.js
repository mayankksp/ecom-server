const Role = require('../../../models/Role');

exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const role = new Role({ name });
        await role.save();
        res.status(201).json({ role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const role = await Role.findByIdAndUpdate(roleId, req.body, { new: true });
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json({ role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const role = await Role.findByIdAndDelete(roleId);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
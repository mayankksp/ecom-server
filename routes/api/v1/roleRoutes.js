const express = require('express');
const router = express.Router();

// Controllers
const {
    createRole,
    getAllRoles,
    updateRole,
    deleteRole
} = require('../../../controllers/api/v1/roleController');

// Middleware
const auth = require('../../../middlewares/auth');
const isAdmin = require('../../../middlewares/isAdmin');

router.use(auth);
router.use(isAdmin);

// Routes
router.post('/create', createRole);
router.get('/', getAllRoles);
router.put('/:roleId', updateRole);
router.delete('/:roleId', deleteRole);

module.exports = router;
const express = require('express');
const userRoutes = require('./userRoutes');
const superAdminRoutes = require('./superAdminRoutes');
const roleRoutes = require('./roleRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/superadmin', superAdminRoutes);
router.use('/roles', roleRoutes);

module.exports = router;
const express = require('express');
const userRoutes = require('./userRoutes');
const superAdminRoutes = require('./superAdminRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/superadmin', superAdminRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();
const isSuperAdmin = require('../../../middlewares/isSuperAdmin');
const { createAdmin, getAdmins, deleteAdmin } = require('../../../controllers/api/v1/superAdminController');
const auth = require('../../../middlewares/auth');

router.use(auth);
router.use(isSuperAdmin);

router.post('/createAdmin', createAdmin);
router.get('/getAdmins', getAdmins);
router.delete('/deleteAdmin/:adminId', deleteAdmin);

module.exports = router;

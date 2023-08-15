const express = require('express');
const router = express.Router();
const isSuperAdmin = require('../../../middlewares/isSuperAdmin');
const { checkSuperAdmin, createAdmin, createRole, createPermission, getAdmins, getRoles, getPermissions, assignRole, assignPermission, updateAdmin, updateRole, updatePermission, deleteAdmin, deleteRole, deletePermission } = require('../../../controllers/api/v1/superAdminController');
const auth = require('../../../middlewares/auth');

router.use(auth);
router.use(isSuperAdmin);

router.post('/createAdmin', createAdmin);
router.post('/createRole', createRole);
router.get('/getAdmins', getAdmins);
router.get('/getRoles', getRoles);
router.post('/assignRole', assignRole);
router.put('/updateAdmin', updateAdmin);
router.put('/updateRole', updateRole);
router.delete('/deleteAdmin', deleteAdmin);
router.delete('/deleteRole', deleteRole);

module.exports = router;

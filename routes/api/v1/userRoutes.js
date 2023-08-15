const express = require('express');
const { register, login, getProfile, logout, checkLoggedIn } = require('../../../controllers/api/v1/userController');
const auth = require('../../../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);
router.get('/check', auth, checkLoggedIn);
router.post('/logout', auth, logout);

module.exports = router;

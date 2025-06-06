const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware.js');
const authorize  = require('../middlewares/authorize.middleware.js');
const userController = require('../controllers/user.controller.js')




router.patch('/password',verifyToken, authorize('canView'),userController.update_passwordController);
router.post('/',userController.add_userController);

module.exports = router;
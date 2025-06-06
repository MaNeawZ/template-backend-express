const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware.js');
const authorize = require('../middlewares/authorize.middleware.js');
const authRoutes = require('../routes/auth.routes.js');
const notidisRoutes = require('../routes/notidiscord.routes.js')
const userRoutes = require('../routes/user.routes.js')

const getMainController = require('../controllers/getdata.controller.js')



router.use('/auth', authRoutes);
router.use('/test',notidisRoutes)
router.use('/user',userRoutes);

// >>>>>>>>>>>>>>> get <<<<<<<<<<<<<<<<<<<
router.get('/all-user', verifyToken, authorize('canEdit'), getMainController.get_alluserController);
// >>>>>>>>>>>>>>> get <<<<<<<<<<<<<<<<<<<


// >>>>>>>>>>>>>>> update <<<<<<<<<<<<<<<<<<<

// >>>>>>>>>>>>>>> update <<<<<<<<<<<<<<<<<<<


// >>>>>>>>>>>>>>> delete <<<<<<<<<<<<<<<<<<<

// >>>>>>>>>>>>>>> delete <<<<<<<<<<<<<<<<<<<
module.exports = router;

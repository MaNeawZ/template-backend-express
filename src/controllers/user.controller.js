const userService  = require('../services/user.service.js')


exports.update_passwordController = async (req, res) => {
  try {
    const users = await userService.update_password(req.body); 
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error.message
    });
  }
};

exports.add_userController = async (req, res) => {
  try {  
    const users = await userService.add_user(req.body); 
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error.message
    });
  }
};

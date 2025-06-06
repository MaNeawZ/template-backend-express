const userService  = require('../services/user.service.js')


exports.get_alluserController = async (req, res) => {
  try {
    const users = await userService.get_alluser(); 
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

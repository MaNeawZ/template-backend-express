const authService = require('../services/auth.service.js');


exports.loginController = async (req, res) => {
    try {
        const login = await authService.loginService(req);
        if (login.status == 401) {
            res.status(401).json({
                data: login.message
            });
        } else {
            res.status(200).json({
                success: true,
                data: login
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        });
    }
};

const notidiscordController  = require('../services/notidiscord.service')

exports.notidiscord = async (req, res) => {
    try {
        const result = await notidiscordController.notidiscordService(); 

        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'ส่งข้อความสำเร็จ',
                status: 200,
                data: result.data
            });
        } else {
            res.status(500).json({
                success: false,
                message: result.message
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
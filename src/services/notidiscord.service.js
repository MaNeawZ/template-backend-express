const axios = require('axios');
require('dotenv/config');
const mysql = require('mysql2');
const qs = require('qs');



exports.notidiscordService = async () => {
    try {
        const webhookUrl = process.env.WEBHOOK_URL;

        const payload = {
            content: 'test',
            username: 'test',
            // avatar_url: 'https://i.imgur.com/AfFp7pu.png',
        };

        const response = await axios.post(webhookUrl, payload);
        console.log('ส่งข้อความสำเร็จ:', response.status);

        return {
            success: true,
            status: response.status,
            data: response.data
        };

    } catch (error) {
        console.error('ส่งไม่สำเร็จ:', error.message);
        return {
            success: false,
            message: error.message
        };
    }
};
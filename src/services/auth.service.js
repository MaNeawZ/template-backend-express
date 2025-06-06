
const pool = require('../../connect_db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginService = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [users] = await pool.query(`SELECT * FROM users WHERE username = ?`,  [username]   );

        
        if (users.length === 0) {
            return { status: 401, message: 'Invalid username or password' };
        }
        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { status: 401, message: 'Invalid username or password' };
        }

        //  permission 
        const permissions = {
            // canView: user.role == '1' || user.role == '2',
            canView: user.role == '1',
            canEdit: user.role == '1', //  role 1  แก้ไขได้
        };

        // สร้าง JWT token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                permissions: permissions, //  เพิ่มสิทธิไว้ใน token
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES || '1h',
            }
        );

        return {status: 200,message: 'Login successful',token};
    } catch (error) {
        console.error('DB ERROR:', error);
        return res.status(500).json({
            success: false,
            data: 'Internal server error',
            error: error.message
        });
    }
};

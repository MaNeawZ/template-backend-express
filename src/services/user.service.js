


exports.get_alluser = async () => {
  try {
    const pool = require('../../connect_db.js');
    const sql = `SELECT * FROM users`;
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.error('DB ERROR:', error);
    throw error;
  }
};


exports.update_password = async (payload) => {
  try {
 
    const pool = require('../../connect_db.js');
    const bcrypt = require('bcrypt');
    const { password1, password2, username } = payload;

    if (password1 !== password2) {
      throw new Error('Passwords do not match');
    }

    // เข้ารหัส (encrypt) Password1 ด้วย bcrypt
    const saltRounds = parseFloat(process.env.BCRYPT_NUM);
    const hashedPassword = await bcrypt.hash(password1, saltRounds);



    const sql = `
      UPDATE users
      SET password = ?, updated_at = NOW()
      WHERE username = ?  LIMIT 1
    `;

    const [result] = await pool.query(sql, [hashedPassword, username]);

    if (result.affectedRows === 0) {
      throw new Error('User not found or password update failed');
    }

    return { message: 'Password updated successfully' };
  } catch (error) {
    console.error('DB ERROR update_password():', error);
    throw error; 
  }
};





exports.add_user = async (payload) => {
  const pool = require('../../connect_db.js'); 
  const bcrypt = require('bcrypt');

  const connection = await pool.getConnection(); 
  try {
    await connection.beginTransaction(); 

    const hashedPassword = await bcrypt.hash(payload.password, 14);
    const sql_add_user = `
      INSERT INTO users (
        username,
        password,
        created_at
      ) VALUES (?, ?, NOW())`;

    const userValues = [payload.username, hashedPassword];
    const [res_user] = await connection.query(sql_add_user, userValues);

    await connection.commit(); 

    return {
      user: res_user
    };
  } catch (error) {
    await connection.rollback(); 
    console.error('DB ERROR:', error);
    throw error;
  } finally {
    connection.release(); 
  }
};
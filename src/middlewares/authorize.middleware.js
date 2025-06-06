const authorize = (permissionKey) => {
    return (req, res, next) => {
      const permissions = req.user?.permissions || {};
        console.log("permissions",permissions);
        
      if (!permissions[permissionKey]) {
        return res.status(403).json({ message: `Permission denied: missing ${permissionKey}` });
      }
  
      next(); // ผ่าน ตรวจสอบสิทธิเรียบร้อย
    };
  };
  
  module.exports = authorize;
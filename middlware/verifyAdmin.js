const isAdminVerifier = (req, res, next) => {
  console.log('User:', req.user); // سجل معلومات المستخدم
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json("You are not allowed to perform this task");
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

  
module.exports = isAdminVerifier;
  
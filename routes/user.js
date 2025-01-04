const express = require('express');
const dotenv = require('dotenv');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const userController = require('../controllers/userController.js');


const router = express.Router();
dotenv.config();


// Register
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// Forgot Password
router.post('/forgot-password', userController.forgotPassword);


// handle reset password post requist
router.post('/reset-password', userController.resetPassword)

// Update Users
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, userController.updateUser)

// Delete Users
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, userController.deleteUser)

// Get Users
router.get('', passport.authenticate('jwt', { session: false }), isAdminVerifier, userController.getUsers)

router.get('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, userController.getOneUser)

// reset password page routes
router.get('/reset-password/:token', userController.restPasswordPage);

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = router
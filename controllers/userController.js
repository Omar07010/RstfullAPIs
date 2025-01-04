const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const passport = require('../config/passport.js')
const { jswSecret } = require('../config/passport.js');
const resendPassword = require('../resendPassword.js');

// Register
exports.registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const newUser = new User({ name: name.toLowerCase(), email: email.toLowerCase(), password, isAdmin });
        if (!newUser) {
            return res.status(400).json('something wrong');
        }
        await newUser.save();
        res.status(200).json('user registered successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).json('error registering user');
    }
};

//Login 
exports.loginUser = (req, res, next) => {
    req.body.email = req.body.email.toLowerCase();
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Authentication error', error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: info.message || 'Invalid credentials' });
        }
        req.logIn(user, { session: false }, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ message: 'Login error', error: loginErr.message });
            }
            const token = jwt.sign({ id: user._id }, jswSecret, { expiresIn: '1h' });
            return res.json({ token });
        });
    })(req, res, next);
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json('User not found!')
        }

        const token = crypto.randomBytes(16).toString('hex')
        user.token = token;
        await user.save();

        const link = `http://localhost:3000/api/v1/users/reset-password/${token}`
        await resendPassword(user.email, link)

            res.status(200).json('message send successfully!')
 
    }catch(error){
        console.error(error);
        res.status(500).json('error sending email!')
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {
    const {token, new_password, confirm_new_password} = req.body;
    
    try{

      const user = await User.findOne({token});
        if(new_password !== confirm_new_password){
            res.status(400).json("Password dosn't match!");
        }

        if(!user){
            return res.status(400).json('Invalid token');
        }
        
        user.password = new_password
        user.token = null;
        await user.save();
        res.status(200).json('Password reset successfully')
        // res.redirect('/login')

    }
    catch(error){
        console.error(error);
    }
}

// Update User
exports.updateUser = async (req, res) => {
    const {id} = req.params
    const updateData = {...req.body}
    try{
         // Hash the password if it's being updated
         if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Normalize email
        if (updateData.name) {
            updateData.name = updateData.name.toLowerCase();
        }

        const updateUser = await User.findByIdAndUpdate(id, updateData, {new: true});
        if (!updateUser) {
            return res.status(404).send('User not found');
          }
        res.status(200).json({message: 'user updated successfully!', user: updateUser});
    }
    catch(err){
        console.log(err);
        res.status(500).json('error update user')
    }
}

// Delete
exports.deleteUser = async (req, res) => {
    const {id} = req.params
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).send('User not found');
          }
        res.status(200).json({message: 'user deleted successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).json('error deleting user')
    }
}

// Get all users
exports.getUsers = async (req, res) => {
    try{
        const getUser = await User.find()
        .select('-password')
        .populate('address')
        .populate('order');
        if (!getUser) {
            res.status(400).json('User not found')
        }
        res.status(200).json(getUser)
    }
    catch(err){
        console.log(err);
        res.status(500).json('Error')
    }
}

// Get one user
exports.getOneUser =  async (req, res) => {
    const {id} = req.params
    try{
        const getOneUser = await User.findById(id)
        .select('-password')
        .populate('address')
        .populate('order');
        if (!getOneUser) {
            res.status(400).json('User not found')
        }
        res.status(200).json(getOneUser)
    }
    catch(err){
        console.log(err);
        res.status(500).json('Error')
    }
}

// Get reset password
exports.restPasswordPage = async (req, res) => {
    const { token } = req.params;   
    const user = await User.findOne({ token })
    if (!user) {
        return res.status(200).json('add your new password')
        // res.redirect('/forgot-password')
    }

    res.render('reset-password', {title: 'Reset Password Page', active: 'reset', token});
}
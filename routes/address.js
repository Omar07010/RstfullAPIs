const express = require('express');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const addressController = require('../controllers/addressController.js');

const router = express.Router()

// Post Address
router.post('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, addressController.addAddress);

// Delete Address
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, addressController.deleteAddress);

// Update Address
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, addressController.updateAddress);

// Patsh date Address
router.patch('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, addressController.setDefaultAddress);

// Get Address
router.get('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, addressController.getAddress);
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, addressController.oneAddress);

module.exports = router


const express = require('express');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const paymentController = require('../controllers/paymentController.js');

const router = express.Router()

// Post Payment
router.post('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, paymentController.createPayment);

// Delete Payment
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, paymentController.deletePayment);

// Patsh Payment
router.patch('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, paymentController.patchPayment);

// Get Payment
router.get('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, paymentController.getPayments);
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, paymentController.onePayment);

module.exports = router
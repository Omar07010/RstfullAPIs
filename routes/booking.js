const express = require('express');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const bookingController = require('../controllers/bookingController.js');


const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, bookingController.getBookings);
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), isAdminVerifier, bookingController.listUserBooking);
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, bookingController.getOneBooking);
router.post('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, bookingController.createBooking);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, bookingController.updateBooking); 
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, bookingController.deleteBooking);

module.exports = router
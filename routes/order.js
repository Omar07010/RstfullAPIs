const express = require('express');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const orderController = require('../controllers/orderController.js');


const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, orderController.getOrders);
router.get('/income', passport.authenticate('jwt', { session: false }), isAdminVerifier, orderController.getIncome);
router.get('/:id', orderController.getOneOrder);
router.post('/', orderController.createOrder);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, orderController.updateOrder); 
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, orderController.deleteOrder);

module.exports = router
const express = require('express');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const dotenv = require('dotenv');
const productController = require('../controllers/productController.js');

const router = express.Router();
dotenv.config();

// Post Methods
router.post('/', productController.addProduct);

// Put Methods putProduct
router.put(`/:id`, passport.authenticate('jwt', { session: false }), isAdminVerifier, productController.putProduct);

router.put(`/:id`, passport.authenticate('jwt', { session: false }), isAdminVerifier, productController.putImages);

// Delete Method
router.delete(`/:id`, passport.authenticate('jwt', { session: false }), isAdminVerifier, productController.deleteProduct);

// GET Methods
router.get(`/`, passport.authenticate('jwt', { session: false }), isAdminVerifier, productController.allProducts);

router.get(`/:id`, productController.oneProduct);

router.get(`/get/count`, passport.authenticate('jwt', { session: false }), isAdminVerifier, productController.countDocuments);

router.get(`/get/featured/:count`, productController.featuredProduct);

router.get(`/fealting/by`, productController.filterProduct);


module.exports = router
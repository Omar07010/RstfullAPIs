const express = require('express');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const categoryController = require('../controllers/categoryController.js');


const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, categoryController.getCategorys);
router.get('/:id', categoryController.getOneCategory);
router.post('/', categoryController.createCategory);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, categoryController.updateCategory); 
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, categoryController.deleteCategory);

module.exports = router
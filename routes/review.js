const express = require('express');
const isAdminVerifier = require('../middlware/verifyAdmin.js');
const passport = require('../config/passport.js');
const reviewController = require('../controllers/reviewController.js');

const router = express.Router()

// Post review
router.post('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.addReview);
router.post('/:id/like', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.likeReview);
router.post('/:id/dislike', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.dislikeReview);
router.post('/:id/report', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.reportReview);

// Delete review
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.deleteReview);

// Update review
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.updateReview);

// Get review
router.get('/', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.getReviews);
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.oneReview);
router.get('/stats', passport.authenticate('jwt', { session: false }), isAdminVerifier, reviewController.getReviewStatistics);

module.exports = router
const Review = require('../models/review.js');

// Post review
exports.addReview = async (req, res) => {
    const { userId, product, rating, comment } = req.body;
    try {
        const postReview = new Review({ userId, product, rating, comment });
        await postReview.save();
        if (!postReview) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Review added successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error adding data', error: err.message });
    }
}

// Delete review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteReview = await Review.findByIdAndDelete(id);
        if (!deleteReview) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Review deleted successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error deleting data', error: err.message });
    }
}

// Put review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body};
    try {
        const updateReview = await Review.findByIdAndUpdate(id, updateData, {new: true});
        if (!updateReview) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Review updated successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error updating data', error: err.message });
    }
}

// Get review
exports.getReviews = async (req, res) => {
    try {
        const getAllReviews = await Review.find()
        .populate('userId')
        .populate('product');
        if (!getAllReviews) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json(getAllReviews);
    } catch (err) {
        res.status(500).json({ message: 'Error getting data', error: err.message });
    }
}

exports.oneReview = async (req, res) => {
    const {id} = req.params
    try {
        const getOneReview = await Review.findById(id)
        .populate('userId')
        .populate('product');
        if (!getOneReview) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json(getOneReview);
    } catch (err) {
        res.status(500).json({ message: 'Error getting data', error: err.message });
    }
}

// Like a review
exports.likeReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
  
      // Toggle like logic (simplified)
      review.likes = (review.likes || 0) + 1;
      await review.save();
  
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
// Dislike a review
exports.dislikeReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
  
      // Toggle dislike logic (simplified)
      review.dislikes = (review.dislikes || 0) + 1;
      await review.save();
  
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Report a review
exports.reportReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
  
      review.reports = (review.reports || 0) + 1; // Increment report count
      await review.save();
  
      res.status(200).json({ message: 'Review reported successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.getReviewStatistics = async (req, res) => {
    try {
      const totalReviews = await Review.countDocuments();
      const averageRating = await Review.aggregate([
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ]);
  
      res.status(200).json({
        totalReviews,
        averageRating: averageRating[0]?.avgRating || 0,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
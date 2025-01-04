const Payment = require('../models/payment');


// Post Payment
exports.createPayment = async (req, res) => {
    const { userId, order, amount, payMethod, transactionId } = req.body;
    try {

    if (!userId || !order || !amount || !payMethod || !transactionId) {
        return res.status(400).json({ message: 'All valuse are required' });
    }

        const newPayment = new Payment(req.body);
        await newPayment.save();
        if (!newPayment) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Payment added successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error adding data', error: err.message });
    }
}

// Patch payment
exports.patchPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ message: ' Status Incorrect' });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not exist!' });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
    try {
        const getAllPayments = await Payment.find()
        .populate('userId');
        if (!getAllPayments) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json(getAllPayments);
    } catch (err) {
        res.status(500).json({ message: 'Error getting data', error: err.message });
    }
}

exports.onePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const getAllPayments = await Payment.findById(id)
        .populate('userId');
        if (!getAllPayments) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json(getAllPayments);
    } catch (err) {
        res.status(500).json({ message: 'Error getting data', error: err.message });
    }
}

// Delete Address
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletePayment = await Payment.findByIdAndDelete(id);
        if (!deletePayment) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Payment deleted successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error deleting data', error: err.message });
    }
}
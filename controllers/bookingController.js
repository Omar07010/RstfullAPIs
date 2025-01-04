const Booking = require('../models/booking');

// Post Booking
exports.createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
        try {
            const savedBooking = await newBooking.save();
            res.status(201).json({
                type: "success",
                message: "Booking created successfully",
                savedBooking
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
}

// Update Booking
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json({
            type: "success",
            message: "Booking updated successfully",
            updatedBooking
        })
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// Delete Booking
exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findOneAndDelete(req.params.id);
        res.status(200).json({
            type: "success",
            message: "Booking has been deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// get all Booking
exports.getBookings = async (req, res) => {
    try {
        const booking = await Booking.find();
        res.status(200).json({
            type: "success",
            booking
        })
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// get list user booking
exports.listUserBooking = async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.params.userId }).populate('userId');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// get one Booking by id
exports.getOneBooking = async (req, res) => {
    const {id} = req.params
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            res.status(404).json({
                type: "error",
                message: "Booking doesn't exists"
            })
        } else {
            res.status(200).json({
                type: "success",
                booking
            })
        }
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}
const Order = require('../models/order.js');

// Post order
exports.createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
        try {
            const savedOrder = await newOrder.save();
            res.status(201).json({
                type: "success",
                message: "Order created successfully",
                savedOrder
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
}

// Update order
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json({
            type: "success",
            message: "Order updated successfully",
            updatedOrder
        })
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findOneAndDelete(req.params.id);
        res.status(200).json({
            type: "success",
            message: "Order has been deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// Get order montly
exports.getIncome = async (req, res) => {
    const date = new Date();
    const lastMonth =  new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { 
                createdAt: { 
                        $gte: previousMonth
                    },
                },
            },
            { 
                $project:{ 
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            },  
        ]);
        res.status(200).json({
            type: "success",
            income
        })
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}


// get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate('userId')
        .populate({
            path: 'products.product',
            model: 'Product'
          });
        res.status(200).json({
            type: "success",
            orders
        })
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// get one order by id
exports.getOneOrder = async (req, res) => {
    const {id} = req.params
    try {
        const order = await Order.findById(id)
        .populate('userId')
        .populate({
            path: 'products.product',
            model: 'Product'
          });
        if (!order) {
            res.status(404).json({
                type: "error",
                message: "Order doesn't exists"
            })
        } else {
            res.status(200).json({
                type: "success",
                order
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
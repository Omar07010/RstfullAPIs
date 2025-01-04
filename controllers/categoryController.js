const Category = require('../models/category');

// Post Category
exports.createCategory= async (req, res) => {
    const newCategory = new Category(req.body);
        try {
            const savedCategory = await newCategory.save();
            res.status(201).json({
                type: "success",
                message: "Category created successfully",
                savedCategory
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
}

// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json({
            type: "success",
            message: "Category updated successfully",
            updatedCategory
        })
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findOneAndDelete(req.params.id);
        res.status(200).json({
            type: "success",
            message: "Category has been deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// get all Category
exports.getCategorys = async (req, res) => {
    try {
        const categorys = await Category.find()
        .populate('product');
        res.status(200).json({
            type: "success",
            categorys
        })
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

// get one Category by id
exports.getOneCategory = async (req, res) => {
    const {id} = req.params
    try {
        const category = await Category.findById(id)
        .populate('product');
        if (!category) {
            res.status(404).json({
                type: "error",
                message: "Category doesn't exists"
            })
        } else {
            res.status(200).json({
                type: "success",
                category
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
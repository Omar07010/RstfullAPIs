const Product = require('../models/product.js');
const Category = require('../models/category.js');
const Review = require('../models/review.js');
const multer = require('multer');
const mongoose = require('mongoose');
 
const FILE_TYPE_MAP = {
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/jpg': 'jpg',
};

// Multar DiskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        if (isValid) {
            cb(null, 'public/uploads');
        } else {
            cb(new Error('Invalid image type'), null); // ila makant ta whda mn hado jpg ola png ola jpeg ghadi yrj3 lina error
        }
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('_');
      const extention = FILE_TYPE_MAP[file.mimetype]; // hadi ghadi trj3 lin nw3 dyal image wash jpg ola png ola jpeg
      cb(null, `${fileName}+${Date.now()}.${extention}`)
    }
})
  
const upload = multer({ storage: storage })


exports.addProduct = [upload.single('image'), async (req, res) => {
    const { name, description, price, category, stock, reviews} = req.body;
        // const findCategory = await Category.findById(req.body.category);
        // if (!findCategory) return res.status(404).json({ message: 'Failed to post data' });

        // const findRivews = await Riview.findById(req.body.riviews);
        // if (!findRivews) return res.status(404).json({ message: 'Failed to post data' });
        const file =  req.file;
        if (!file) return res.status(404).json({ message: 'No image in the request!' });

        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const fileName =req.file.filename;

    try{
        const newProduct = new Product({
            name, 
            description, 
            price, 
            category, 
            stock,
            image: `${basePath}${fileName}`,
            reviews
        })
        await newProduct.save();
        res.status(201).json({ message: 'Product posted successfully!', product: newProduct });
    }
    catch(err){
        console.log(err);       
        res.status(500).json('Faild to add product!')
    }
}]


// Get all pruducts
exports.allProducts = async (req, res) => {
    try {
        const productlist = await Product.find()
        .populate('category')
        .populate('reviews');
        res.status(200).json(productlist);
    } catch (err) {
        res.status(500).json({ message: 'Error getting productlist', error: err.message });
    }
}

// Get one product by id
exports.oneProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        .populate('category')
        .populate('reviews');
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error getting product', error: err.message });
    }
}

// Get document count
exports.countDocuments = async (req, res) => {
    try {
        const productCount = await Product.countDocuments(); // had countDocuments katrj3 lina shhal kayn dyal document 
        res.send({productCount: productCount})
    } catch (err) {
        res.status(500).json({ message: 'Error getting productCount', error: err.message });
    }
}

// Get newest product
exports.featuredProduct = async (req, res) => {
    const {count} = req.params ? req.params : 0;
    try {
        const productFeatured = await Product.find({isFeatured: true}).limit(+count); // hadi katrj3 lin newest product ahdat z3ma
        res.send({productFeatured})
    } catch (err) {
        res.status(500).json({ message: 'Error getting productFeatured', error: err.message });
    }
}

exports.filterProduct = (req, res) => {
    const filter = {}
    if (req.query) {
        filter = {category: req.query.split(',')}; // fhalat bghina nrj3o ghir product li 3ndhom category mo3ayana, li fhad lhala hya 3ibara 3an object kayn f Category schema
    }
    const productFeatured =  Product.find(filter).populate('category');
    res.send({productFeatured})
    if (!productFeatured) {
        res.status(500).json({ message: 'Error getting productFeatured', error: err.message });
    }
    
}

// Update product
exports.putProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ message: 'Invalaid Product Id'});
    }
    const { name, description, price, category, stock, image, reviews } = req.body;

    // const findCategory = await Category.findById(req.body.category);
    // if(!findCategory) return res.status(404).json({ message: 'Failed to update data'});

    // const findReviews = await Review.findById(req.body.reviews);
    // if(!findReviews) return res.status(404).json({ message: 'Failed to update data'});

    try {
        const putProduct = await Product.findByIdAndUpdate(id, {
            name, description, price, category, stock, image, reviews
        }, { new: true });

        if (!putProduct) {
            return res.status(404).json({ success: false });
        }
        console.log(req.body);
        
        res.status(200).json(putProduct); //'Product updated successfully!'
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
}

// Update images
exports.putImages = upload.array('images', 10), async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: 'Invalaid Product Id'});
    }
    const files = req.files;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let imagesPaths = []
    if (files) {
        files.map(file => {
            imagesPaths.push(`${basePath}${fileName}`)
        })
    }
      
    try {
        const putProduct = await Product.findByIdAndUpdate(id, {
            images: imagesPaths
        }, { new: true });
    
        if (!putProduct) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Product updated successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
}

// Delete Product

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Product deleted successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error deleting data', error: err.message });
    }
}
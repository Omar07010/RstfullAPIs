const Address = require('../models/address');

// Post address
exports.addAddress = async (req, res) => {
    const postAddress = {...req.body};
    try {

        // Check if the user already has addresses
        const existingAddresses = await Address.find({ userId: postAddress.userId });

        // If this is the first address, set isDefault to true
        if (existingAddresses.length === 0) {
            postAddress.isDefault = true; // Set first address as default
        } else {
            postAddress.isDefault = postAddress.isDefault || false; // Default to false if not specified
        }

        const newAddress = new Address(postAddress);
        await newAddress.save();
        if (!newAddress) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Address added successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error adding data', error: err.message });
    }
}

// Put Address
exports.updateAddress = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body};
    try {
        const updateAddress = await Address.findByIdAndUpdate(id, updateData, {new: true});
        if (!updateAddress) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Address updated successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error updating data', error: err.message });
    }
}

// Patch address
exports.setDefaultAddress = async (req, res) => {
    const { id } = req.params;
  
    try {
      // canceled first address as default 
      await Address.updateMany({ userId: req.user.id, isDefault: true }, { isDefault: false });
  
      // Set the new address as default
      const updatedAddress = await Address.findByIdAndUpdate(id, { isDefault: true }, { new: true });
  
      if (!updatedAddress) {
        return res.status(404).json({ message: ' Address not found! ' });
      }
  
      return res.status(200).json(updatedAddress);
    } catch (error) {
      return res.status(500).json({ message: 'Error', error });
    }
  };
  

// Get all addresses
exports.getAddress = async (req, res) => {
    try {
        const getAllAddresses = await Address.find()
        .populate('userId');
        if (!getAllAddresses) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json(getAllAddresses);
    } catch (err) {
        res.status(500).json({ message: 'Error getting data', error: err.message });
    }
}

exports.oneAddress = async (req, res) => {
    const {id} = req.params
    try {
        const getOneAddress = await Address.findById(id)
        .populate('userId');
        if (!getOneAddress) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json(getOneAddress);
    } catch (err) {
        res.status(500).json({ message: 'Error getting data', error: err.message });
    }
}

// Delete Address
exports.deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteAddress = await Address.findByIdAndDelete(id);
        if (!deleteAddress) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json('Address deleted successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error deleting data', error: err.message });
    }
}
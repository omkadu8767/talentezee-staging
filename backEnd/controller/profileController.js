const Profile = require('../models/profile');
const mongoose = require('mongoose');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Valid user ID is required' });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(id) }, 
      { $set: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Valid user ID is required' });
    }

    const profile = await Profile.findOne({ userId: id });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.status(200).json({ profile }); // ⬅️ Wrap in { profile }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


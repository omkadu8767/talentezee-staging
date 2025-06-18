const Profile = require('../models/profile');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
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
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const profile = await Profile.findOne({ userId });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

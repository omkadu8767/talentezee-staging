const User = require('../models/user');
const Stat = require('../models/stat');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'random#secret';

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already in use' });

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // 4. Create or upsert Stat safely (prevents duplicate errors)
    await Stat.findOneAndUpdate(
      { userId: newUser._id },
      {}, // You can prefill stats here if needed
      { upsert: true, new: true }
    );

    // 5. Generate token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    // 6. Return response
    return res.status(201).json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });

  } catch (err) {
    console.error('Register Error:', err);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    // 3. Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // 4. Return response
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

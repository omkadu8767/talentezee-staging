const User = require('../models/user');
const Stat = require('../models/stat');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'random#secret';

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Incoming registration:", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists');
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("User saved:", newUser);

    const statDoc = await Stat.create({ userId: newUser._id });
    console.log("Stat created:", statDoc);

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });

  } catch (err) {
    console.error('Register Error Stack:', err.stack); // more detailed
    return res.status(500).json({ message: 'Server error' });
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

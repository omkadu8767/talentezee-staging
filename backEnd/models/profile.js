const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  id: String,
  company: String,
  position: String,
  startDate: String,
  endDate: String,
  description: String,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  id: String,
  institution: String,
  degree: String,
  startDate: String,
  endDate: String,
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  id: String,
  name: String,
  issuer: String,
  date: String,
}, { _id: false });

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  profilePicture: String,
  name: String,
  email: String,
  phone: String,
  location: String,
  title: String,
  summary: String,
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [String],
  certifications: [certificationSchema]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
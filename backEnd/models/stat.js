const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  totalApplications: { type: Number, default: 100 },
  activeJobs: { type: Number, default: 10 },
  profileViews: { type: Number, default: 5 },
  responseRate: { type: Number, default: 30 },
  credits: { type: Number, default: 5 } 
});

module.exports = mongoose.model('Stat', statSchema);

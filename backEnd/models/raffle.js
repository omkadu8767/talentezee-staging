const mongoose = require('mongoose');

const raffleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  tickets: { type: Number, default: 0 },
});

module.exports = mongoose.model('Raffle', raffleSchema);
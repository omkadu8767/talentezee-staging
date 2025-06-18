// controllers/raffleController.js
const Raffle = require('../models/raffle');

exports.getRaffleStatus = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    let raffle = await Raffle.findOne({ userId });
    if (!raffle) {
      raffle = await Raffle.create({ userId, tickets: 0 });
    }

    res.json({ tickets: raffle.tickets });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.awardRaffleTicket = async (req, res) => {
  try {
    const { userId, action } = req.body;
    if (!userId || !action) return res.status(400).json({ error: 'User ID and action required' });

    const raffle = await Raffle.findOneAndUpdate(
      { userId },
      { $inc: { tickets: 1 } },
      { upsert: true, new: true }
    );

    res.json({ message: 'Raffle ticket awarded', tickets: raffle.tickets });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
const Activity = require('../models/activity');
const Stat = require('../models/stat');

exports.getUserActivities = async (req, res) => {
  try {
    const { id } = req.params;
    const activities = await Activity.find({ userId: id }).sort({ date: -1 }).limit(10);
    res.json({ activities });
  } catch (err) {
    console.error('Activity fetch error:', err);
    res.status(500).json({ message: 'Error fetching user activities' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await Stat.findOne({ userId: id });
    res.json({ stats });
  } catch (err) {
    console.error('Stats fetch error:', err);
    res.status(500).json({ message: 'Error fetching user stats' });
  }
};

exports.handleQuickAction = async (req, res) => {
  try {
    const { userId, action } = req.body;

    let creditsUsed = 0;
    switch (action) {
      case 'generate_resume':
      case 'practice_interview':
        creditsUsed = 1;
        break;
      default:
        creditsUsed = 0;
    }

    if (creditsUsed > 0) {
      await Stat.updateOne({ userId }, { $inc: { credits: -creditsUsed } });
    }

    await Activity.create({
      userId,
      type: action,
      title: `Performed action: ${action}`,
      date: new Date(),
      status: 'completed'
    });

    res.json({ message: 'Action performed', creditsUsed });
  } catch (err) {
    console.error('Quick action error:', err);
    res.status(500).json({ message: 'Quick action failed' });
  }
};

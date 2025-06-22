require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
const Stat = require("../models/stat"); 
const stat = require('../models/stat');

exports.chargeCard = async (req, res) => {
  const { paymentMethodId, userId, amount } = req.body;
  console.log("Received body:", req.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
      metadata: { userId },
    });
    const creditsToAdd = amount / 100; 
    await Stat.findOneAndUpdate(
      { userId },
      { $inc: { credits: creditsToAdd } },
      { upsert: true, new: true }
    );
    const stat = await Stat.findOne({ userId });

    res.json({ success: true, paymentIntentId: paymentIntent.id, stat});
  } catch (error) {
    console.error('Payment error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const Enrollment = require('./models/enrollment');
const profileRoutes = require('./routes/profileRoutes');
const dashboardRouter = require('./routes/dashboardRouter');
const purchaseRouter = require('./routes/purchaseRouter');
const raffleRouter = require('./routes/raffleRouter');
require('dotenv').config();

const app = express();
const PORT = 10000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to Server API!' });
});

app.use(cors({ origin: 'https://talentezee-client.vercel.app/' }));

app.use(cors({
  origin: "*", // Allow all origins (for development)
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/enroll', async (req, res) => {
  const { userId, platform } = req.body;

  try {
    const enroll = new Enrollment({ userId, platform });
    await enroll.save();
    res.status(201).json({ message: 'User enrolled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll user' });
  }
});

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', dashboardRouter);
app.use('/api/payment', purchaseRouter);
app.use('/api/raffle', raffleRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
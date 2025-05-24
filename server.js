const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({
  telegramId: String,
  name: String,
  email: String,
  wallet: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/submit', async (req, res) => {
  const { telegramId, name, email, wallet } = req.body;

  const user = new User({ telegramId, name, email, wallet });
  await user.save();

  res.send({ success: true });
});

const bot = require('./bot');
bot.launch();

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

const axios = require('axios');
const bot = require('./botjs'); // if you export bot from bot.js

(async () => {
  await bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/webhook`);
})();


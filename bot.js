const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const userStates = new Map();

bot.start((ctx) => {
  userStates.set(ctx.chat.id, { step: 0, data: {} });
  ctx.reply("Welcome! What's your full name?");
});

bot.on('text', async (ctx) => {
  const state = userStates.get(ctx.chat.id);

  if (!state) return ctx.reply("Type /start to begin.");

  const steps = [
    "What’s your email?",
    "What’s your wallet address?",
    "Thank you! Your data has been submitted."
  ];

  const currentStep = state.step;

  if (currentStep === 0) {
    state.data.name = ctx.message.text;
    ctx.reply(steps[0]);
  } else if (currentStep === 1) {
    state.data.email = ctx.message.text;
    ctx.reply(steps[1]);
  } else if (currentStep === 2) {
    state.data.wallet = ctx.message.text;

    // Send to backend
    try {
      await axios.post('http://localhost:3000/submit', {
        telegramId: ctx.chat.id,
        ...state.data
      });
    } catch (e) {
      console.error(e);
    }

    ctx.reply(steps[2]);
    userStates.delete(ctx.chat.id);
    return;
  }

  state.step++;
});

module.exports = bot;

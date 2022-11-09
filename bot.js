const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

let fl = 0
let bot;

// if production env, we use webhooks
// https://core.telegram.org/bots/api#setwebhook
// https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#TelegramBot+setWebHook
if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
  console.log('**** BOT initiated ***** ');
} else {
  // otherwise, we use polling
  // differences between webhooks and polling:
  // https://core.telegram.org/bots/webhooks
  // https://stackoverflow.com/questions/40033150/telegram-bot-getupdates-vs-setwebhook
  bot = new TelegramBot(token, { polling: true });
}

console.log(`Bot started in the ${process.env.NODE_ENV} mode`);

bot.on('message', async (msg) => {
  commands = ['/start'];
  const {text, chat: {id}, from:{first_name, username }} = msg

 if (text === '/start') {
    await bot.sendMessage(id, `Hello ${username}, if you're interested in contributing for our project please send UIP task number, your GitHub account name and tell us a few words about your software development experience`)
  }

  if (text !== '/start') {
   fl = 1
 }

  // if (text === '/location') {
  //   const opts = {
  //     reply_markup: JSON.stringify({
  //       keyboard: [
  //         [{text: 'Location', request_location: true}],["Cancel"],
  //       ],
  //       resize_keyboard: true,
  //       one_time_keyboard: true,
  //     }),
  //   };
  //   await bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
  //
  // }

  if (fl) {
    fl = 0
  const html = `<pre><strong>Thank your for the interest ${username}, we'll contact you soon! Feel free to ask any question in our telegram channel:</strong><a href='https://t.me/+q8tzqV5TCmw4NTA6'>testChannel</a></pre>`

    await bot.sendMessage(id, html, {parse_mode: 'HTML'})
  }
});

// bot.onText(/location/, (msg) => {
//   const opts = {
//     reply_markup: JSON.stringify({
//       keyboard: [
//         [{text: 'Location', request_location: true}],
//         [{text: 'Contact', request_contact: true}],
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: false,
//     }),
//   };
//   bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
// });

// bot.once( "location"

// bot.on('location', async (msg) => {
//   console.log('location', msg.location)
//
//   const {latitude, longitude } = msg.location
//   await bot.sendLocation(msg.chat.id, latitude, longitude, {proximity_alert_radius: 100000, horizontal_accuracy: 1000} )
//
// });

module.exports = bot;
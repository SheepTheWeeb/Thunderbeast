require('dotenv').config();
import Discord from 'discord.js';
import CommandLookup from './utils/CommandLookup';
import EmojiLookup from './utils/EmojiLookup';
import MessageHandler from './controllers/MessageHandler';
import RoleSelectListener from './controllers/RoleSelectListener';

const client = new Discord.Client();
const messageHandler = new MessageHandler(process.env.PREFIX);
const roleSelectListener = new RoleSelectListener();

// Load in CommandLookup and EmojiLookup
const emojiLookup = new EmojiLookup();
export { emojiLookup };
const commandLookup = new CommandLookup();
export { commandLookup };

// Init discord client
client.on('ready', () => {
  emojiLookup.init(client);
  roleSelectListener.listen(client);
  console.log(`Logged in as ${client.user.tag}!`);
});

// Use message handler to handle messages
client.on('message', (msg) => {
  messageHandler.handle(msg);
});

// Start the bot
client.login(process.env.DISCORD_TOKEN);

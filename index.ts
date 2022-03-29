require('dotenv').config();

const bannedWords = require('./bannedwords.json');

import { keepAlive } from './keepalive';
const Discord = require('discord.js')

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	]
});

client.on('ready', () => {
	console.log(`${client.user.tag} is ready!`);
	keepAlive();
});

client.on('messageCreate', message => {
	if (!message.author.bot) {
		message.reply("sus");
	}
});

client.login(process.env.TOKEN);
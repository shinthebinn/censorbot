// Configure package so environment variables in the .env file are accessible
require('dotenv').config();

// import packages and external files
const bannedWords: string[] = require('./bannedwords.json');

import { keepAlive } from './keepalive';
import * as Discord from 'discord.js';

// Check if message contains bad word or not
const containsBannedWord = (msg: string) => {
	// Split up message by spaces so that compound words aren't caught
	let words = msg.split(' ');

	// index through the banned words list and return true if the message includes a banned word
	for (let i = 0; i < bannedWords.length; i++) {
		if (words.includes(bannedWords[i])) {
			return true;
		}
	}

	// if nothing is found return false
	return false;
}

// set up bot with required intents
const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	]
});

// when the client is ready, print to console, check if above function is working, and run express server
client.on('ready', () => {
	console.log(`${client.user?.tag} is ready!`);

	let bannedString = bannedWords.reduce((p, c, i) => {
		if (i == 0) {
			return c;
		} 
		return `${p} ${c}`;
	});

	console.log(containsBannedWord(bannedString) ? "" : "...but not detecting banned words correctly");

	keepAlive();
});

// Event is run when someone sends a message in a channel the bot has access to
client.on('messageCreate', message => {
	// Only go if author isn't a bot
	if (!message.author.bot) {
		
		// If the message contains a banned word, delete it and then log event data to the console
		if (containsBannedWord(message.content)) {
			message.delete()
				.then(m => console.log(`Deleted message reading "${m.content}" from ${m.author.tag}`));
		}

	}
});

// login with token provided in environment variables
client.login(process.env.TOKEN);
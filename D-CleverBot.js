// Cleverbot for Discord made by HitCoder. Feel free to reuse. This script is fairly simplistic so no credit needed.

//Not ready for use yet - unfinished.

const botToken = '' // Place your bot's token in here.
const cleverBotLogin = ['API User','API Key']; // https://cleverbot.io/keys - replace API User and API Key correspondingly

var Discordie = require("discordie");
var cleverbot = require("cleverbot.io");

const Events = Discordie.Events;
const client = new Discordie();

client.connect({
	token: botToken
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
	console.log('connected as: ' + client.User.username);
	console.log('*** BOT IS READY ***');
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	var msg = e.message.content;
	if (msg.indexOf("<@"+client.User.id+">") !== -1){
		var bot = new cleverbot(cleverBotLogin[0], cleverBotLogin[1]);
		bot.setNick("cleverbot")
		bot.create(function (err, cleverbot) {
			bot.ask(msg.substring(24,msg.length), function (err, response) {
				e.message.channel.sendMessage(response);
			});
		});
	}
});

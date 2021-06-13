if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const fs = require('fs');
const Twit = require('twit');
const Discord = require("discord.js");
const config = require("./config");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Fetch all command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Set all commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(process.env.BOT_TOKEN);

// Vars
const prefix = "!";

// Twitter stream
const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
    strictSSL: true,
});

var stream = T.stream('statuses/filter', {
    follow: '1166443278834659328, 1176161051827757062'
});

stream.on('tweet', function (tweet) {
    if ( !isReply(tweet) ) {
        const twitterMessage = `Incoming intel from HQ! Requesting your attention @everyone.

${tweet.user.screen_name} just posted this on their Twitter account: 

https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
        client.channels.cache.get(process.env.DISCORD_CHANNEL).send(twitterMessage);
    }
});

// Set the bot's presence (activity and status)
client.once("ready", () => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Twitter',
            type: 'WATCHING',
            url: 'https://www.twitter.com/'
        }
    });
});

// Welcome new members
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`${member} just joined this server. Let's give a warm welcome :smiley:`);
});

// Respond to commands
client.on("message", function(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        //console.log(message);
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.reply('I could not understand it. :worried:');
        client.channels.cache.get('761665371249049650').send(`An error occurred executing the below command sent by: ${message.author.username}`);
        client.channels.cache.get('761665371249049650').send(message);
    }
}); 


// SOURCE - https://github.com/ttezel/twit/issues/286#issuecomment-236315960
function isReply(tweet) {
    if (tweet.retweeted_status
      || tweet.in_reply_to_status_id
      || tweet.in_reply_to_status_id_str
      || tweet.in_reply_to_user_id
      || tweet.in_reply_to_user_id_str
      || tweet.in_reply_to_screen_name) return true;
    return false;
  }
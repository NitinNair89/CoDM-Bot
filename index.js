if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Twit = require('twit')
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const prefix = "!";
let isBotSleeping = false;

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
        const twitterMessage = `
        Check it out @everyone. ${tweet.user.screen_name} just tweeted this:/n 
        https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}
        ******************************
        `;
        client.channels.cache.get(process.env.DISCORD_CHANNEL).send(twitterMessage);
    }
});

client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        // GREETINGS
        case "morning":
        case "wakeup":
        case "goodmorning":
            message.reply(`Good Morning! :sun_with_face:`);
            message.channel.send(`Good Morning @everyone`);
            isBotSleeping = false;
            break;

        case "night":
        case "sleep":
        case "goodnight":
            message.reply(`Goodnight!`);
            message.channel.send(`Goodnight @everyone.`);
            message.channel.send("I will stay awake a bit longer. Send !stop to put me in standy mode.");
            break;

        // CASUAL
        case "hey":
        case "hi":
        case "wassup":
            if ( !isBotSleeping ) {
                message.reply(`Hey wassup!`);
            } else {
                message.reply(`Bot is sleeping. To wake up, send !start`);
            }
            break;

        // WAKE/SLEEP
        case "start":
            message.reply("Did you message? I'm awake now. :sunglasses:");
            isBotSleeping = false;
            break;

        case "stop":
            message.reply("Thank you. Let me rest for a while. :yawning_face:");
            isBotSleeping = true;
            break;

        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            break;

        case "gameon":
            const lang = args[0];
            if ( lang === "english" ) {
                message.channel.send(`There can be only one winner. Let's go! @everyone`);
            } else if ( lang === "hindi" ) {
                message.channel.send(`Chalo CoD khelte hai! @everyone`);
            } else {
                message.channel.send(`There can be only one winner. Let's go! @everyone`);
            }
            break;

        case "thanks":
        case "thankyou":
            message.reply(`you're welcome :blush:`)
            break;
    
        default:
            message.reply("I did not understand that. Sorry! :slightly_frowning_face:");
            break;
    }
}); 


// SOURCE:
// https://github.com/ttezel/twit/issues/286#issuecomment-236315960
function isReply(tweet) {
    if (tweet.retweeted_status
      || tweet.in_reply_to_status_id
      || tweet.in_reply_to_status_id_str
      || tweet.in_reply_to_user_id
      || tweet.in_reply_to_user_id_str
      || tweet.in_reply_to_screen_name) return true;
    return false;
  }
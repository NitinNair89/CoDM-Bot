if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Twit = require('twit')
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const prefix = "!";
let isBotSleeping = false;

// Object to store user's custom settings for reference
const userSettings = {
    "nickname": []
}

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


// Welcome new members
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`${member} just joined this server. Let's give a warm welcome :smiley:`);
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
            message.reply(`a very good morning! Hope you had a good sleep. :sun_with_face:`);
            isBotSleeping = false;
            break;

        case "night":
        case "sleep":
        case "goodnight":
            message.reply(`have a good night's rest. :crescent_moon:`);
            break;

        // CASUAL
        case "hey":
        case "hi":
        case "wassup":
            if ( !isBotSleeping ) {
                message.reply(`hey wassup!`);
            } else {
                message.reply(`I'm sleeping. To wake me, send !start`);
            }
            break;

        // WAKE/SLEEP
        case "start":
            message.reply("did you message? I'm awake now. :sunglasses:");
            isBotSleeping = false;
            break;

        case "stop":
            message.reply("thank you. Let me rest a bit. :yawning_face:");
            isBotSleeping = true;
            break;

        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`pong! Latency => ${timeTaken}ms.`);
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

        case "nickname":
            const n = args[0];
            if ( n === undefined ) {
                message.reply("use `!nickname name` to give me a nick name. :smiley:");
            } else {
                if ( n === "reset" ) {
                    resetNickname(message.author.username);
                    message.reply("I have removed the nickname. You can set it again with `!nickname name`");
                } else {
                    // Check if user already set a nickname for Bot, if not add nickname else share command to reset
                    const len = userSettings.nickname.length;
                    let isNicknameSet = false;
                    if ( len !== 0 ) {
                        for ( let i = 0; i < userSettings.nickname.length; i++ ) {
                            if ( userSettings.nickname[i].by === message.author.username ) {
                                message.reply("you've already given me a nickname. :smiley: You can reset by `!nickname reset`");
                                isNicknameSet = true;
                                break;
                            }
                        }
                    }
                    if ( !isNicknameSet ) {
                        const nickname = {
                            "name": n,
                            "by": message.author.username
                        };
                        userSettings.nickname.push(nickname);
                        message.reply("thank you for giving me a nickname :blush:");
                    }
                }
            }
            break;
    
        case "welcome":
            const user = args[0];
            if ( user !== undefined ) {
                message.channel.send(`Excited to have you here on our server, ${user}. :smiley:`);
            }
            break;
        
        default:
            message.reply("I did not understand that. Sorry! :slightly_frowning_face:");
            message.author.send("Hi! Since I failed to understand your message, I have asked Dev team to check.");

            client.channels.cache.get('761665371249049650').send(`Hi! I could not understand the below message sent by ${message.author.username}`);
            client.channels.cache.get('761665371249049650').send(message);
            client.channels.cache.get('761665371249049650').send('Please check once.');
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

// Function to reset Bot nickname
const resetNickname = (username) => {
    for ( let i = 0; i < userSettings.nickname.length; i++ ) {
        if ( userSettings.nickname[i].by === username ) {
            userSettings.nickname.splice(i,1);
            break;
        }
    }
}
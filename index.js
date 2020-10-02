const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const prefix = "!";
let isBotSleeping = false;

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
            message.channel.send("Let me rest a bit. :yawning_face:");
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

        case "help":
            message.reply(`
I am still learning. Right now I can:
    - !ping : Share latency
    - !gameon english/hindi : Notify everyone to play CoDM
`);
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
            }
            break;
    
        default:
            message.reply("I did not understand that. Sorry! :slightly_frowning_face:");
            break;
    }
}); 

client.login(config.BOT_TOKEN);
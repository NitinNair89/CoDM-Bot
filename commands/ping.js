module.exports = {
    name: 'ping',
    aliases: ['speed', 'net'],
    description: 'Checks latency',
	execute(message, args) {
        const timeTaken = Date.now() - message.createdTimestamp;
            if ( timeTaken <= 25 ) {
                message.reply(`Latency is: ${timeTaken}ms, perfect for playing CoDM right now.`);
            } else if ( timeTaken > 25 && timeTaken <= 50) {
                message.reply(`Latency is: ${timeTaken}ms. You may face minor frame skips during gameplay.`);
            } else if ( timeTaken > 50 && timeTaken <= 75 ) {
                message.reply(`Latency is: ${timeTaken}ms. Sorry bud, you will lag.`);
            } else if ( timeTaken > 75 ) {
                message.reply(`Latency is: ${timeTaken}ms. I won't recommend playing games right now.`);
            }
	},
};
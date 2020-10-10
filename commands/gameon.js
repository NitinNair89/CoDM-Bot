module.exports = {
	name: 'goodmorning',
	description: 'Greets user with a good morning wish',
	execute(message, args) {
        message.channel.send(`There can be only one winner. Let's go! @everyone`);
	},
};
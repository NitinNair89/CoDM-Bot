module.exports = {
	name: 'gameon',
	description: 'Informs all members to join the game',
	execute(message, args) {
        message.channel.send(`There can be only one winner. Let's go! @everyone`);
	},
};
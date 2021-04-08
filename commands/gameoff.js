module.exports = {
	name: 'gameoff',
	description: 'Informs all members that the player has stooped playing',
	execute(message, args) {
        message.channel.send(`There can be only lag. Let's sleep! Do not ping me. :shushing_face:`);
	},
};
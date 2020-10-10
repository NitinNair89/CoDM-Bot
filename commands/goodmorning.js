module.exports = {
	name: 'goodmorning',
	description: 'Greets user with a good morning wish',
	execute(message, args) {
        message.reply(`a very good morning! Hope you had a good sleep. :sun_with_face:`);
	},
};
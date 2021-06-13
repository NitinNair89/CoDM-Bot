const broadcastMessage = require('../broadcast');
const Discord = require('discord.js');

module.exports = {
    name: 'features',
    aliases: ['whatsnew', 'new'],
	description: 'Displays newly released CoDM-Bot features',
	execute(message, args) {
        message.channel.send({ embed: broadcastMessage });
	},
};
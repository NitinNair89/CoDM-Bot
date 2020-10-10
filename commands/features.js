const broadcastMessage = require('../broadcast');
const Discord = require('discord.js');

module.exports = {
    name: 'features',
    aliases: ['whatsnew', 'new'],
	description: 'Displays newly released CoDM-Bot features',
	execute(message, args) {
        //console.log(message);

        //broadcastMessage = new Discord.MessageEmbed();
        message.channel.send({ embed: broadcastMessage });
	},
};
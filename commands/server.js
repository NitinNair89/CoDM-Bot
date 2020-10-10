const Discord = require('discord.js');

module.exports = {
    name: 'server',
    aliases: ['server-info'],
	description: 'Displays server and total members',
	execute(message, args) {
        //console.log(message);

        const serverInfo = new Discord.MessageEmbed();
        serverInfo
        .setColor('#8E24AA')
        //.setTitle('Server Information')
        //.setURL('https://discord.js.org/')
        .setAuthor('CoDM-Bot', '', '')
        //.setDescription('')
        //.setThumbnail('bot logo here')
        .addFields(
            { name: 'Server Name', value: message.guild.name },
		    { name: 'Server ID', value: message.guild.id },
            { name: 'Server Region', value: message.guild.region },
            { name: 'Total Members', value: message.guild.memberCount },
            { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp()
        .setFooter('CoDM-Bot', /*'bot logo mini'*/);
        
        message.channel.send(serverInfo);
	},
};
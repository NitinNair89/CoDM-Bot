const Discord = require('discord.js');

module.exports = {
    name: 'user-info',
    aliases: ['myinfo', 'aboutme', 'whoami', 'card'],
	description: "Shows user's information",
	execute(message, args) {
        //console.log(message);

        const userInfo = new Discord.MessageEmbed();
        userInfo
        .setColor('#8E24AA')
        //.setTitle('Server Information')
        //.setURL('https://discord.js.org/')
        //.setAuthor('CoDM-Bot', '', '')
        //.setDescription('')
        .setThumbnail(message.author.displayAvatarURL())
        .addFields(
            { name: 'Member ID', value: message.author.id },
            { name: 'Member Name', value: message.author.username },
            { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp()
        .setFooter('CoDM-Bot', /*'bot logo mini'*/);
        
        message.channel.send(userInfo);
	},
};
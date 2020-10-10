const { prefix } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lists available commands and information about a specific command',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if ( !args.length ) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('That\'s not a valid command!');
        }

        const commandInfo = new Discord.MessageEmbed();
        commandInfo
        .setColor('#8E24AA')
        .addFields(
            { name: 'Name', value: command.name },
		    { name: 'Aliases', value: command.aliases.join(', ') },
            { name: 'Purpose', value: command.description },
            { name: 'How to use', value: prefix + command.name },
            { name: 'Cooldown', value: `${command.cooldown || 3} second(s)` },
            { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp()
        .setFooter('CoDM-Bot', /*'bot logo mini'*/);
        message.channel.send(commandInfo);
	},
};

const Discord = require('discord.js');
const request = require('request');

module.exports = {
    name: 'quote',
    description: 'Fetch and display quotes using ZenQuotes API',
    aliases: ['speed', 'net'],
    cooldown: '5',
	execute(message, args) {
        if ( args.length < 1 ) {
            message.channel.send('Please use one keyword - "random" or "today".');
        } else if ( args.length > 1 ) {
            message.channel.send('I can process only ONE keyword. :slight_frown: ');
        } else if ( args[0] !== "random" && args[0] !== "today" ) {
            message.channel.send('Please use either - "random" or "today".');
        } else {
            request(`https://zenquotes.io/?api=${args[0]}`, { json: true }, (err, res, body) => {
                if (err) { 
                    message.channel.send('Oops! Something went wrong. Try another word. :frowning:');
                    return;
                 }

                const exampleEmbed = {
                    color: '#8E24AA',
                    title: 'An Inspirational Quote for You',
                    fields: [
                        {
                            name: `${body[0]['a']}`,
                            value: `"${body[0]['q']}"`,
                        },
                    ],
                    footer: {
                        text: 'Powered by ZenQuotes API',
                    },
                }    
                message.channel.send({ embed: exampleEmbed });
            }); 
        }
	},
};
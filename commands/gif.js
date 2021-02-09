const Discord = require('discord.js');
const request = require('request');

module.exports = {
    name: 'gif',
    description: 'Searches a meme with the keyword and displays it',
	execute(message, args) {
        if ( args.length < 1 ) {
            message.channel.send('Please tell what meme you want me to search.');
        } else if ( args.length > 1 ) {
            message.channel.send('I can process only ONE search word. :slight_frown: ');
        } else {
            request(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${args}&limit=1&offset=0&rating=g&lang=en`, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }

                const exampleEmbed = {
                    image: {
                        url: body.data[0].images.original.url,
                    },
                    footer: {
                        text: 'Powered By GIPHY',
                    },
                }    
                message.channel.send({ embed: exampleEmbed });
            }); 
        }
	},
};
const Discord = require('discord.js');
const request = require('request');

module.exports = {
    name: 'meme',
    description: 'Searches a meme with the keyword and displays it',
    params: 'funny',
	execute(message, args) {
        if ( args.length < 1 ) {
            message.channel.send('Please tell what meme you want me to search.');
        } else if ( args.length > 1 ) {
            message.channel.send('I can process only ONE search word. :slight_frown: ');
        } else {
            request(`https://api.giphy.com/v1/gifs/search?api_key=kBEIwvypJV6zWtgS2WuoDF0zQK7F3pRT&q=${args}&limit=1&offset=0&rating=g&lang=en`, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                message.channel.send(body.data[0].embed_url);
            }); 
        }
	},
};
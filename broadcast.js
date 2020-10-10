// Used to send broadcast message whenever features are added
module.exports = {
	color: '#FF9800',
	title: 'New features released! :star_struck:',
	// author: {
	// 	name: 'Some name',
	// 	icon_url: 'https://i.imgur.com/wSTFkRM.png',
	// 	url: 'https://discord.js.org',
	// },
	description: 'I am now at v1.2.0 and that means I can function more efficiently than before. There are some new commands added, try them out. :wink:',
	thumbnail: {
		//url: 'bot logo here',
	},
	fields: [
        {
            name: 'CoDM-Bot version',
            value: 'v1.2.0'
        },
		{
			name: '!server OR !server-info',
			value: 'This command will display information about this server.',
		},
		{
			name: '!user-info OR !aboutme OR !myinfo OR !whoami OR !card',
			value: 'This command will display information about you.',
        },
        {
			name: '!features OR !whatsnew OR !new',
			value: 'This command will display recently added features. Whenever a new feature is ready, I will inform it to all our members. :angel:',
        },
        { name: '\u200B', value: '\u200B' },
	],
	image: {
		//url: 'https://i.imgur.com/wSTFkRM.png',
	},
	timestamp: new Date(),
	footer: {
		text: 'CoDM-Bot',
		//icon_url: 'https://i.imgur.com/wSTFkRM.png',
	},
};
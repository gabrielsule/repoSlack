/*BOOTKIT*/
var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: 'xoxb-30205149072-WmnmK8u29zsAYbUCojMvUWaX'
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});

controller.hears('dummy (.*) (.*)', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    controller.storage.users.get(message.user, function (err, user) {

	var http = require('http');

	var lat = message.match[1];
	var lng = message.match[2];
	
	console.log(lat);
	console.log(lng);
	
	var extServerOptions = {
		host: 'geofutbol.azurewebsites.net',
		path: '/api/canchas/getCahchas/'+ lat +'/'+ lng +'/1',
		method: 'GET'
	};

	function get() {
		http.request(extServerOptions, function (res) {

			res.setEncoding('utf8');
			res.on('data', function (data) {
			   //bot.reply(message, data);
			   bot.reply(message,
			   {
				'text': 'Resultado de la consulta',
				'attachments':
				[
				{
					'title' : 'JSON', 
					'text' : data, 
					'color': '#FF00FF'
				}
				]
				
			   });
			});
	 
		}).end();
	};
	 
	get();	
    });
});

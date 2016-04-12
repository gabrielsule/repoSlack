////Envio de mensajes a #general bot - npm install slack-node
//var Slack = require('slack-node');
//webhookUri = "https://hooks.slack.com/services/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";
//slack = new Slack();
//slack.setWebhook(webhookUri);

//slack.webhook({
//    channel: "#general",
//    username: "tsugibot",
//    icon_emoji: "http://icons.iconarchive.com/icons/creativeflip/starwars-longshadow-flat/128/Boba-Fett-icon.png",
//    text: "Mensaje de prueba desde node.js", 
//    "attachments": [
//        {
//            "title": "Titulo del attach",
//            "title_link": "https://tsugi-team.slack.com/messages/general/",
//            "text": "aca va algo de texto descriptivo",
//        }
//    ]
//}, function (err, response) {
//    console.log(response);
//});


//lista usuarios - npm install slack-node
//var Slack = require('slack-node');
//apiToken = "xoxp-20885479504-20878763924-30203268275-d63af26d6d";

//slack = new Slack(apiToken);

//slack.api("users.list", function (err, response) {
//    console.log(response);
//});


//envio de archivos - npm install node-slack-upload
var Slack = require('node-slack-upload');
apiToken = "xoxp-20885479504-20878763924-30203268275-d63af26d6d";
var slack = new Slack(apiToken);
var fs = require('fs');
var path = require('path');

slack.uploadFile({
    file: fs.createReadStream(path.join(__dirname, '..', 'demo.txt')),
    filetype: 'post',
    title: 'DemoSauria',
    initialComment: 'algun comentario para Maxi',
    channels: '#general'
}, function (err) {
    if (err) {
        console.error(err);
    }
    else {
        console.log('done');
    }
});



/*BOOTKIT*/
var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages



//controller.spawn({
//    token: 'xoxb-30205149072-VKyWg4U5OTeghOxHThzVR6ev'
//}).startRTM(function (err) {
//    if (err) {
//        throw new Error(err);
//    }
//});


//controller.hears('hola', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
//    controller.storage.users.get(message.user, function (err, user) {
//        if (user && user.name) {
//            bot.reply(message, 'Hola ' + user.name + '!!');
//        } else {
//            bot.reply(message, 'Hola, cual es tu nombre???');
//        }
//    });
//});

//controller.hears('soy un genio?', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
//    bot.reply(message, 'Claro que si, por eso soy tu creación ;)');
//});

//controller.hears('mi nombre es (.*)', ['direct_message,direct_mention,mention'], function (bot, message) {
//    var name = message.match[1];
//    controller.storage.users.get(message.user, function (err, user) {
//        if (!user) {
//            user = {
//                id: message.user,
//            };
//        }
//        user.name = name;
//        controller.storage.users.save(user, function (err, id) {
//            bot.reply(message, 'OK dale, desde ahora te voy a llamar ' + user.name);
//        });
//    });
//});

//controller.hears('mi amor?', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
//    bot.reply(message, {
//        text: 'Johana alias bichita !!!!',
//        icon_emoji: ':heart:'
//    });
//});
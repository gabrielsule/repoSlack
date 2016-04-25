/*BOOTKIT*/
var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: 'xoxb-xxxxxxxxxxxxx'
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});

var tokken = "CLDYYP9SIe4alYW5U2FsdGVkX198t4LRL8I6paWYMHozsir9gGRSDu796dHJKuyL0B%2FSW0o0Xq33lTqdq4%2BbLjAGxrpyFgi57My9sKbM6emeMnT%2F2kKqKfaIsSnXTuI8FG1vDdT7dbUGkV0ibeYcWogeoTFhq1j7QyhF3IfPM%2FXBYOHbeHF%2FGcjxrm6G0JMAZNHtfYECQqZl%2Bop3MOTYgPfk%2BRfYlu9swBljPg%3D%3D";

////////// Obtener Proyectos
controller.hears('obtener proyectos', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    controller.storage.users.get(message.user, function (err, user) {

	var http = require('http');

	var extServerOptions = {
		host: 'xxx.azurewebsites.net',
		path: '/GDP2WSREST.svc/GetProjects/?tokken=' + tokken,
		method: 'GET'
	};

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );

  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }
      return ret.join( '' );
  }

})();

String.prototype.contains = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};

function removeCharsFromProject(parameter) {
  var textFromJSON = parameter;
  textFromJSON.replace('"ProjectName":"', '');
  textFromJSON.replace('"', '');
  textFromJSON.replace('}', '');
  textFromJSON.replace(']', '');
  textFromJSON.replace(']', '');
  return textFromJSON;
}

function removeCharsFromJSON(parameter) {
  var textFromJSON = parameter;
  textFromJSON.replace('"', '');
  textFromJSON.replace('"UserName":"', '');
  textFromJSON.replace('[', '');
  textFromJSON.replace('{', '');
  textFromJSON.replace('Active', '');
  textFromJSON.replace(':', '');
  textFromJSON.replace(/['"]+/g, '');
  textFromJSON.replace('LastName', '');
  textFromJSON.replace('"UserName":"', '');
  return textFromJSON;
}

	function get() {
		http.request(extServerOptions, function (res) {
			res.setEncoding('utf8');
			res.on('data', function (data) {
        var arrStr = data.split(",");
        var infoFormat = "";

         for (var i = 0; i < arrStr.length; i++) {
           if (arrStr[i].contains("ProjectName"))
           {
             arrStr[i] = removeCharsFromProject(arrStr[i]);
             infoFormat = infoFormat + "\n" + "*Nombre del Proyecto:* " + arrStr[i];
           }
         }
         arrStr = [];

           bot.reply(message,
  			   {
  				'text': infoFormat
  			   });
			});

		}).end();
	};

	get();
    });
});

////////// Obtener Usuarios
controller.hears('obtener usuarios', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    controller.storage.users.get(message.user, function (err, user) {

	var http = require('http');

	var extServerOptionsUsers = {
		host: 'xxx.azurewebsites.net',
		path: '/GDP2WSREST.svc/GetAllUsers/?tokken=' + tokken,
		method: 'GET'
	};


String.prototype.contains = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};

	function get() {
		http.request(extServerOptionsUsers, function (res) {
			res.setEncoding('utf8');
			res.on('data', function (data) {

        var arrStr = data.split(",");
        var infoFormat = "";

         for (var i = 0; i < arrStr.length; i++) {
           if (arrStr[i].contains("UserName"))
           {
             arrStr[i] = removeCharsFromJSON(arrStr[i]);
             infoFormat = infoFormat + "\n" + "*Usuario:* " + arrStr[i];
           }
         }
         arrStr = [];

           bot.reply(message,
  			   {
  				'text': infoFormat
  			   });

			});

		}).end();
	};

	get();
    });
});

////////// Obtener un Usuario específico
controller.hears('obtener usuario (.*)', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    controller.storage.users.get(message.user, function (err, user) {

  var user = message.match[1];
	var http = require('http');

	var extServerOptionsUsers = {
		host: 'xxx.azurewebsites.net',
		path: '/GDP2WSREST.svc/GetAllUsers/?tokken=' + tokken,
		method: 'GET'
	};

String.prototype.contains = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};

	function get() {
		http.request(extServerOptionsUsers, function (res) {

			res.setEncoding('utf8');
			res.on('data', function (data) {

        var arrStr = data.split(",");
        var infoFormat = "";
        var userData = "";
        var finalMsg = "";

         for (var i = 0; i < arrStr.length; i++) {
           if (arrStr[i].contains("Active"))
           {
             arrStr[i] = removeCharsFromJSON(arrStr[i]);
             userData = userData + "\n" + "*Active:* " + arrStr[i];
             i = i++;
           }
           if (arrStr[i].contains("LastName"))
           {
             arrStr[i] = removeCharsFromJSON(arrStr[i]);
             userData = userData + "\n" + "*LastName:* " + arrStr[i];
             i = i++;
           }
           if (arrStr[i].contains("UserName"))
           {
             arrStr[i] = removeCharsFromJSON(arrStr[i]);
             infoFormat = userData + "\n" + "*Usuario:* " + arrStr[i];

             if (arrStr[i] ==  user) {
               i = arrStr.length;
               finalMsg = infoFormat;
               break;
             } else {
               userData = "";
               infoFormat = "";
             }
           }
         }
         arrStr = [];

           bot.reply(message,
  			   {
  				'text': finalMsg
  			   });

			});

		}).end();
	};

	get();
    });
});

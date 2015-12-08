var ini = require('ini');
var fs = require('fs');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
var WebSocket = require('ws');
var wss = new WebSocket("ws://"+config.websocketserver.host+":"+config.websocketserver.port);
var devid = "1422";

wss.on('open', function open() {
	if (process.argv.slice(2) != "")
		devid = process.argv.slice(2)[0];
	
	var msg = {
		type: "devicesync",
		action: "refreshcamera",
		data: { "devid": devid },
        createat: new Date().getTime()
	};
	
	wss.send(JSON.stringify(msg));
	
	setInterval(function() {
	    if (wss.bufferedAmount == 0) {
          //process.exit(1);
        }
    }, 50);
	
});

/*
ws.on('message', function (data, flags) {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    console.log(data);
});
*/

//console.log(process.argv.slice(2));
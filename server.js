var ini = require('ini'),
    fs = require('fs'),
    config = ini.parse(fs.readFileSync('./config.ini', 'utf-8')),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ host: config.websocketserver.host, port: config.websocketserver.port });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        console.log(client);
        client.send(data);
    });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', JSON.stringify(message));

        wss.broadcast(message);
    });
});
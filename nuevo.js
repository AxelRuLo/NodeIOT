var express = require('express');
var app = express();
var url = require('url');
var http = require('http').Server(app);
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: http });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));

wss.on('error', function(error) {
    console.log(error);
});

wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    console.log('connected');
    ws.on('message', function incoming(message) {
        console.log(message);
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(message));
        });
    });
    //ws.send('something');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
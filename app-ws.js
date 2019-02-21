const ws = require('ws').Server;
const app = require('express')();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index-ws.html');
});

http.listen(3000, () => {
    console.log('server open #' + 3000);
});

const wss = new ws({
    server: http,
    autoAcceptConnections: false
});

let clients = [];

wss.on('connection', (ws) => {
    ws.send('server connected');
    clients.push(ws);

    ws.on('message', msg => {

        console.log(msg);

        clients.forEach(client => {
            if (client !== ws) ws.send(msg);
        });
    });
});
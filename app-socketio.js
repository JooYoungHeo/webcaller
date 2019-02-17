const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connect', (socket) => {
    console.log('user connected');

    socket.on('message', msg => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log('http server open #' + port);
})
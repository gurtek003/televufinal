const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000; 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const clients = {};

io.on('connection', (socket) => {
    console.log(socket.id + ' connected');
    clients[socket.id] = socket;

    socket.on('message', (message) => {
        console.log('message: ' + message);
        // Broadcast message to all other clients
        Object.keys(clients).forEach(clientId => {
            if (clientId !== socket.id) {
                clients[clientId].emit('message', message);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
        // Remove disconnected client from clients object
        delete clients[socket.id];
    });
});

server.listen(port, () => {
    console.log('Server listening on port ' + port);
});

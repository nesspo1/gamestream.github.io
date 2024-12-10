const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the HTML files to the client
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });
    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });
    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });
});

// Start the server
server.listen(8094, () => {
    console.log('Server is running on http://localhost:8094');
});

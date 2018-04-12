//imports
const express = require('express');
app = express();
http = require('http');
server = http.Server(app);
io = require('socket.io')(server);

//constants
port = 8000;

io.on('connection', (socket) => {

    socket.emit("new_connection", {
        message: "You connected to server",
        time: socket.handshake.time,
    });

    socket.on('initialMsg', (from, msg) => {
        console.log("Received msg\n from: " + from + "\n ID: " + socket.id + "\n Message: " + msg);
    })

    socket.on('data', (data) => {
        console.log(data);
    });

});

server.listen(port, () => {
    console.log(`Seving from port ${port}`);
});
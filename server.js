//imports
const express = require('express');
app = express();
http = require('http');
server = http.Server(app);
io = require('socket.io')(server);

//constants
port = 8000;


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
    const emitToGraph = (data) => {
        io.emit('dataToGraph', data);
    }

    socket.emit("new_connection", {
        message: "You connected to server",
        time: socket.handshake.time,
    });

    socket.on('initialMsg', (from, msg) => {
        console.log("Received msg\n from: " + from + "\n ID: " + socket.id + "\n Message: " + msg);
    });

    socket.on('dataFromPi', (data) => {
        emitToGraph(data);
    });
});


server.listen(port, () => {
    console.log(`Seving from port ${port}`);
});
//imports
const express = require('express');
app = express();
http = require("http");
server = http.Server(app);
io = require('socket.io')(server);
mongoose = require('mongoose');
fs = require('fs');

//constants
port = 8000;
file = "log.dat";

//time variable
let t = 0;

if(!fs.existsSync(file)){
    fs.closeSync(fs.openSync(file, 'w'));
}
let stream = fs.createWriteStream(file, {flags:'a'});

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
        //new Date().getTime() / 1000
        stream.write(`${t}, ${data} \n`);
        t++;
    });
});


server.listen(port, () => {
    console.log(`Seving from port ${port}`);
});
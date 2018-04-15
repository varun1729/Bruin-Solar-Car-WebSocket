const io = require('socket.io-client');
	socket = io.connect('http://localhost:8000', { reconnect: true });
	readline = require('readline');

	rl = readline.createInterface({
	    input: process.stdin,
	});

socket.on('connect', () => {
    console.log('Attempting to connect from RasberryPi_1');
});

socket.on('new_connection', (msg) => {
    console.log(msg.message + " at " + msg.time);
    socket.emit('initialMsg', 'RasberryPi_1', 'Connecting from RasberryPi!');
    rl.on('line',  (line) => {
		socket.emit('dataFromPi',line);
	});
});

setInterval(()=>{
	socket.emit('dataFromPi', Math.random()*2 + 6);
},1000);

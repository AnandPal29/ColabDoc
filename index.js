const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(`${__dirname}/public`));


const port = process.env.port || 3000;
io.on('connection', (socket) => {
    console.log(`User Connected`);
    
    const text = fs.readFileSync('./public/data.txt', 'utf-8');
    socket.emit('initialText', text);

    socket.on('textUpdate', (val) => {
        fs.writeFile('./public/data.txt',val,'utf-8', (err)=> {
        });
        io.emit('sendUpdate', val);
    });
});

server.listen(port, ()=> {
    console.log(`✔️ Servier Started On Port ${port}✔️`);
})
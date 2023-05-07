import express from 'express';
const app = express();
const PORT = process.env.PORT || 3011;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(express.static('client/dist'));
import { Server } from 'socket.io';
const io = new Server(server);
io.on('connection', (socket) => {
    socket.on('login', (name) => {
        socket.data.name = name;
        socket.emit('message', { text: `Welcome to the chat, ${name}`, bot: true });
        io.emit('message', { text: `${name} has joined the chat`, bot: true });
    });
    socket.on('message', (msg) => {
        console.log('got a new message', msg);
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        io.emit('message', { text: `${socket.data.name} has left the chat`, bot: true });
    });
});

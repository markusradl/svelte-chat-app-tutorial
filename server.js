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
    socket.emit('message', { text: 'Hi from the server!', bot: true });
    socket.on('message', (msg) => {
        console.log('got a new message', msg);
        io.emit('message', msg);
    });
});

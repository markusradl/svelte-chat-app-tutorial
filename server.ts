// setup express server
import express from 'express'
const app = express()
const PORT = process.env.PORT || 3011
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// serve front end
app.use(express.static('client/dist'))

// use socket.io with express server
import { Server } from 'socket.io'
const io = new Server<
    client_to_server_events,
    server_to_client_events,
    inter_server_events,
    socket_data
>(server)

// user list

let users: user[] = []

// handle user connections
io.on('connection', (socket) => {
    socket.on('login', (name) => {
        socket.data.name = name
        users = [{ id: socket.id, name }, ...users]
        io.emit('users', users)
        socket.emit('message', { text: `Welcome to the chat, ${name}`, bot: true })
        io.emit('message', { text: `${name} has joined the chat`, bot: true })
    })

    socket.on('message', (msg) => {
        io.emit('message', msg)
    })

    socket.on('disconnect', () => {
        users = users.filter((u) => u.id !== socket.id)
        io.emit('users', users)
        io.emit('message', { text: `${socket.data.name} has left the chat`, bot: true })
    })
})

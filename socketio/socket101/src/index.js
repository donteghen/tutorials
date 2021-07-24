const express = require('express');
const path = require('path');
const http = require('http');
const {Server} = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../public')));
app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})
let count = 0;
io.on('connection', (socket) => {
   socket.on('join count', user => {
       console.log(user + 'joined')
       socket.broadcast.emit('joined', `${user} just joined the counting.`)
   })
   socket.emit('count', count);
   socket.on('add', () => {
       count++;
       io.emit('count', count)
   })
   socket.on('subtract', () => {
    count--;
    io.emit('count', count)
})
   socket.on('disconnect', () => {
       console.log(' a user left')
   })
})

server.listen(port, () => {
    console.log(`Up and running at : http://localhost:${port}`)
})

// process.on('SIGINT', () => {
//     console.log('shuting down all processes');
//     server.close(() => {
//         setTimeout(() => {
//             console.log('Process successfully exited')
//             process.exit(0)
//         }, 5000)
//     })
// })
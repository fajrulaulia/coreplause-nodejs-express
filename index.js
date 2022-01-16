const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ws = require('ws');
const messageController = require('./src/message.controller')

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    socket.on('message', message => console.log(message.values()));
});


// server listening on $PORT
app.use(express.json())
const server = app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))


// routes
app.get('/', (req, res) => {
    const msg = {
        message: 'Welcome to Coreplause Service'
    }
    if (!(req.query.owner === undefined || req.query.owner === null || req.query.owner === "")) {
        msg['request_from'] = req.query.owner
    }
    res.json(msg)
})

app.post('/send',(req,res)=> messageController.Send(req,res,wsServer))
app.get('/histories', messageController.Histories)

// app.get('/trigger', (req, res) => {
//     wsServer.clients.forEach(client => client.send('Webpack has recompiled'));
 
//     res.json("OKKK")
// })




server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});
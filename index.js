const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors:{
        origin: "*",
    }
})
const routes = require('./routes')
const cors = require('cors')
const actions = require('./utils/socketActions');
const PORT = process.env.PORT||5000

app.use(cors())
//Middlewares
app.use(bodyParser.json({}))


///End middlewares
app.set('socket',io);
app.use('/',routes)

io.on('connection',(socket)=>{
    const room = socket.handshake.query.room
    console.log('new user')
    socket.join(room)
    socket.on(actions.DRAW,(coordinates)=>{
        socket.to(room).emit(actions.DRAW,coordinates)
    })
    socket.on(actions.CLEAR,()=>{
        socket.to(room).emit(actions.CLEAR)
    })
})

http.listen(PORT, () => {
console.log(`Listening on port:${5000}`);
});
const express = require('express');
const router = express.Router();
const actions = require('../utils/socketActions')
router.get('/',(req,res)=>{
    res.send({rooms:[{name:'lalala',users:20},{name:'trtrtr',users:20},{name:'ddsddsds',users:20}]})
})
router.post('/clear',(req,res)=>{
    const {room} = req.body;
    const socket = req.app.get('socket')
    socket.to(room).emit(actions.CLEAR)
    res.send();
})
module.exports= router;

const express = require('express');
const router = express.Router();
const rooms  = require('./rooms');

router.use('/rooms',rooms);

module.exports=router;
const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT;
const path = require('path');


//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
server.listen(port, (error) => {
    if (error) throw new Error(error);
    console.log(`Servidor corriendo en el puerto ${port}`);
})
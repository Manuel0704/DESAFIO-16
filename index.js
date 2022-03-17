const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Container = require('./models/container.api');
const dbConfig = require('./db/config');

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

const MessagesContainer = new Container(dbConfig.sqlite3, 'messages');
const ProductsContainer = new Container(dbConfig.mariaDB, 'products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

//SOCKET
io.on('connection', async socket => {
    console.log('USUARIO CONECTADO');

    //carga de productos
    socket.emit('products', await ProductsContainer.getAll());

    //creacion de producto
    socket.on('new-product', async newProduct => {
        await ProductsContainer.saveData(newProduct);
        io.emit('products', await ProductsContainer.getAll());
    });

    //carga de mensajes
    socket.emit('messages', await MessagesContainer.getAll());

    //envio de mensaje
    socket.on('new-message', async message => {
        await MessagesContainer.saveData(message);
        io.emit('messages', await MessagesContainer.getAll());
    });

});

//LISTEN
const myserver = httpServer.listen(PORT, () => {
    console.log("SERVIDOR ACTIVO EN EL PUERTO 8080");
});
myserver.on('error', error => {
    console.log(`Error: ${error}`);
});
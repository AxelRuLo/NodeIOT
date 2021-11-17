const express = require("express");
const app = express()
const port = process.env.PORT || 3000

var server = require('http').Server(app)
const io = require("socket.io").listen(server)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//sockets

io.on('connection', (cliente) => {
    console.log("cliente conectado" + cliente.id)

    cliente.on('message', (data) => {
        console.log("datos: " + data)
    })
    cliente.emit('mensaje', 'Bienvenido!')
})


//express
app.get("/", (req, res) => {
    res.json({ "respuesta": "todo salio bien" })
})

app.listen(port, () => {
    console.log("Servidor  escuchando en el puerto %s", port)
})
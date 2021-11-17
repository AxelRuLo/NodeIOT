const express = require("express");
const app = express()
const port = process.env.PORT || 3000

var server = require('http').Server(app)
const io = require("socket.io")(server)

//sockets

io.on('connection', (cliente) => {
    console.log("cliente conectado" + cliente.id)

    cliente.on('message', (data) => {
        console.log("datos: " + data)
    })
})


//express
app.get("/", (req, res) => {
    res.json({ "respuesta": "todo salio bien" })
})

app.listen(port, () => {
    console.log("Servidor  escuchando en el puerto %s", port)
})
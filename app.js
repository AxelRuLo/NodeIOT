const express = require("express");
const app = express()
const port = process.env.PORT || 3000

app.set('port', port);

var server = app.listen(app.get('port'), () => {
    console.log("Servidor  escuchando en el puerto %s", app.get('port'))
})

//sockets

var SocketIo = require("socket.io");
const io = SocketIo(server)

io.on('connection', (socket) => {
    console.log("cliente conectado " + socket.id)

    // io.on('message', (data) => {
    //     console.log("datos: " + data)
    // })

    socket.on('disconnect', () => {
        console.log("el socket se desconecto " + socket.id)
    })
    socket.on('message', (data) => {
        console.log("el socket dice" + data)
    })

    socket.on('connection', (data) => {
            console.log("el socket dice" + data)
        })
        //     // cliente.emit('message', 'Bienvenido!')
})


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));
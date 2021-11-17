const express = require("express");
const app = express()
const port = process.env.PORT || 3000

var cors = require('cors');

app.use(cors());

app.set('port', port);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

var server = app.listen(app.get('port'), () => {
    console.log("Servidor  escuchando en el puerto %s", app.get('port'))
})


var SocketIo = require("socket.io");
const io = SocketIo(server,{
  cors: {
    origin: '*',
  }
})

io.on('connection', (socket) => {
    console.log("cliente conectado " + socket.id)

    socket.on('disconnect', () => {
        console.log("el socket se desconecto " + socket.id)
    })
    socket.on('message', (data) => {
        console.log("el socket dice " + data)
        io.emit(data)
    })

    socket.on('connection', (data) => {
            console.log("el socket dice " + data)
        })
        //     // cliente.emit('message', 'Bienvenido!')
})


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));
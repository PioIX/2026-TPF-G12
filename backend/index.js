

/*
var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');

const { Server } = require("socket.io");


var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
*/

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");
const { realizarQuery } = require('./modulos/mysql');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sessionMiddleware = session({
  secret: "girasol",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

const server = app.listen(port, () => {
  console.log(`Servidor NodeJS corriendo en http://localhost:${port}/`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});



io.on("connection", (socket) => {
  const req = socket.request;
  let contador = 0;

  socket.on("joinRoom", (data) => {
    if (req.session.room != undefined && req.session.room.length > 0) {
      socket.leave(req.session.room);
    }
    req.session.room = data.room;
    console.log("Join Room: " + req.session.room)
    socket.join(req.session.room);

    io.to(req.session.room).emit("chat-messages", {
      user: req.session.user,
      room: req.session.room,
    });
  });

  socket.on("pingAll", (data) => {
    console.log("PING ALL:", data);
    io.emit("pingAll", { event: "Ping to all", message: data });
  });

  socket.on("sendMessage", (data) => {
    console.log(data)
    console.log("Room: " + data.room)
    io.to(data.room).emit("newMessage", {
      room: data.room,
      message: data.message,
    });
  });

  socket.on("eventoPersonalizado", () => {

    contador++;
    socket.emit("respuestaPersonalizada", { contador });
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

app.get('/', function (req, res) {
  res.status(200).send({
    message: 'GET Home route working fine!'
  });
});

//  ---------------- GETS GENERALES  --------------------------------
// Tablas:
// Chats_por_usuario_tpi2
// Chats_tpi2
// Usuarios_tpi2
// Mensajes_tpi2

app.get('/getUsuarios', async function (req, res) {
  let respuesta = await realizarQuery("SELECT * FROM Usuarios_tpi2");
  console.log({ respuesta })
  res.send(respuesta);
})

app.get('/getChats', async function (req, res) {
  let respuesta = await realizarQuery("SELECT * FROM Chats_tpi2");
  res.send(respuesta);
})

app.get('/getMensajes', async function (req, res) {
  let respuesta = await realizarQuery("SELECT * FROM Mensajes_tpi2");
  res.send(respuesta);
})

app.get('/getChatsPorUsuario', async function (req, res) {
  let respuesta = await realizarQuery("SELECT * FROM Chats_por_usuario_tpi2");
  res.send(respuesta);
})

// GETS ESPECIFICOS  (Pasar el parámetro como: localhost:3000/nombreDelPedido?parametro1=valor1)
app.get('/getusuarioschatespec', async function (req, res) {
  let respuesta;
  if (req.query.idchat != undefined) {
    respuesta = await realizarQuery(`SELECT id_usuario FROM Chats_por_usuario_tpi2 where id_chat = ${req.query.idchat}`)
  } else {
    respuesta = "Por favor especificar parámetro (idchat)"
  }
  res.send(respuesta);
})




//   ---------------  REGISTRO Y LOGIN  --------------------------

app.post('/register', async function (req, res) {
  console.log(req.body) //Los pedidos post reciben los datos del req.body
  let respuesta = await realizarQuery(`
        Select  *  From Usuarios_tpi2
        Where nombre = "${req.body.nombre}"
        `)
  if (respuesta.length == 0) {
    await realizarQuery(`
        INSERT INTO Usuarios_tpi2(nombre, mail, contrasenia, foto) VALUES 
        ("${req.body.nombre}","${req.body.mail}","${req.body.contrasenia}", "${req.body.foto}")
    `)
    let respuesta2 = await realizarQuery(`SELECT id_usuario FROM Usuarios_tpi2 WHERE nombre="${req.body.nombre}"`)
    res.send({ mensaje: "Usuario agregado", ok: true, id_user: respuesta2[0].id_usuario })
  } else {
    res.send({ mensaje: "Este dato ya existe", ok: false })
  }
})

app.post('/login', async function (req, res) {
  console.log(req.body)
  let respuesta = await realizarQuery(`
        Select  *  From Usuarios_tpi2
        Where nombre = "${req.body.nombre}" AND contrasenia = "${req.body.contrasenia}"
        `)
  if (respuesta.length == 0) {
    res.send({ mensaje: "No se encontró el usuario ingresado" })
  } else {
    res.send({ mensaje: "Usuario encontrado" })
  }
})

// creacion de un chat de a 2
app.post('/chatnuevo', async function (req, res) {
  try {
    console.log(req.body)
    let id_usuario2 = await realizarQuery(`
        Select  id_usuario  From Usuarios_tpi2
        Where mail = "${req.body.mail}"
        `)

    let foto_usuario2 = await realizarQuery(`
        Select  foto  From Usuarios_tpi2
        Where mail = "${req.body.mail}"
      `)
    if (id_usuario2.length != 0) {
      await realizarQuery(`
        INSERT INTO Chats_tpi2(nombre_chat, foto) VALUES 
        ("${req.body.nombre_chat}", "${foto_usuario2[0].foto}")
      `)

      let id_chat = await realizarQuery(`
          SELECT id_chat FROM Chats_tpi2 WHERE nombre_chat = "${req.body.nombre_chat}"
        `)

      if (id_chat.length != 0) {
        let respuesta1 = await realizarQuery(`
            INSERT INTO Chats_por_usuario_tpi2(id_usuario, id_chat) VALUES 
            (${id_usuario2[0].id_usuario}, ${id_chat[0].id_chat})
            `)

        let respuesta2 = await realizarQuery(`
            INSERT INTO Chats_por_usuario_tpi2(id_usuario, id_chat) VALUES 
            (${req.body.id_usuario}, ${id_chat[0].id_chat})
            `)
      }

      res.send({ mensaje: "Chat agregado", ok: true })
    } else {
      res.send({ mensaje: "Este dato ya existe", ok: false })
    }
  } catch {
    res.send({ mensaje: "Error del try" })
  }

})

// creacion chat grupal
app.post('/gruponuevo', async function (req, res) {
  try {
    console.log(req.body)
    await realizarQuery(`
      INSERT INTO Chats_tpi2(nombre_chat, foto) VALUES 
      ("${req.body.nombre_chat}", "${req.body.foto}")
    `)
    let id_chat = await realizarQuery(`SELECT id_chat FROM Chats_tpi2 WHERE nombre_chat = "${req.body.nombre_chat}"`)
    let respuesta2 = await realizarQuery(`
      INSERT INTO Chats_por_usuario_tpi2(id_usuario, id_chat) VALUES 
      (${req.body.id_usuario}, ${id_chat[0].id_chat})
    `)

    res.send({ mensaje: "Chat agregado", ok: true })
  } catch {
    res.send({ mensaje: "Error del try" })
  }

})



// añadir usuario a grupo
app.post('/metergente', async function (req, res) {
  try {
    console.log(req.body)
    let id_chat = null
    let id_usuario2 = await realizarQuery(`
        Select  id_usuario  From Usuarios_tpi2
        Where mail = "${req.body.mail}"
      `)
    console.log(id_usuario2)

    if (id_usuario2.length != 0) {
      id_chat = await realizarQuery(`SELECT id_chat FROM Chats_tpi2 WHERE nombre_chat = "${req.body.nombre_chat}"`)
      console.log(id_chat)
    }

    if (id_chat.length != 0) {
      let respuesta1 = await realizarQuery(`
        Select  id_usuario  From Chats_por_usuario_tpi2
        Where id_chat = ${id_chat[0].id_chat} and id_usuario = ${id_usuario2[0].id_usuario}
      `)
      console.log(respuesta1)
      if (respuesta1.length == 0) {
        let respuesta2 = await realizarQuery(`
        INSERT INTO Chats_por_usuario_tpi2(id_usuario, id_chat) VALUES 
          (${id_usuario2[0].id_usuario}, ${id_chat[0].id_chat})
        `)
        res.send({ mensaje: "usuario agregado" })
      } else {
        res.send({ mensaje: "Error, ya esta añadido" })
      }
    } else {
      res.send({ mensaje: "Error, no existe ese grupo" })
    }
  } catch {
    res.send({ mensaje: "Error del try" })
  }
})














// historial

app.post('/getchatsdeusuario', async function (req, res) {
  let respuesta = await realizarQuery(`
        SELECT nombre_chat FROM Chats_tpi2
        INNER JOIN Chats_por_usuario_tpi2 ON Chats_por_usuario_tpi2.id_chat = Chats_tpi2.id_chat
        INNER JOIN Usuarios_tpi2 ON Usuarios_tpi2.id_usuario = Chats_por_usuario_tpi2.id_usuario
        WHERE Usuarios_tpi2.id_usuario = ${req.body.id_usuario};
        `);
  res.send(respuesta);
})

app.post('/gethistorialchat', async function (req, res) {
  let respuesta = await realizarQuery(`
        SELECT texto, fecha, nombre, Usuarios_tpi2.id_usuario FROM Mensajes_tpi2
        INNER JOIN Chats_tpi2 ON Chats_tpi2.id_chat = Mensajes_tpi2.id_chat
        INNER JOIN Usuarios_tpi2 ON Usuarios_tpi2.id_usuario = Mensajes_tpi2.id_usuario
        WHERE Mensajes_tpi2.id_chat = ${req.body.id_chat};
        `);
  res.send(respuesta);


})


app.post('/getchatsej4', async function (req, res) {
  let obj = {
    id_usuario: req.body.id_usuario,
    chats: []
  }
  let respuesta = await realizarQuery(`
        SELECT Chats_tpi2.foto, nombre_chat, Chats_tpi2.id_chat FROM Chats_tpi2
        INNER JOIN Chats_por_usuario_tpi2 ON Chats_por_usuario_tpi2.id_chat = Chats_tpi2.id_chat
        INNER JOIN Usuarios_tpi2 ON Usuarios_tpi2.id_usuario = Chats_por_usuario_tpi2.id_usuario
        WHERE Usuarios_tpi2.id_usuario = ${req.body.id_usuario};
        `);
  obj.chats = respuesta
  res.send(obj)
})
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
let rooms = [];

app.use(cors());
app.use(router);


io.on('connect', (socket) => {
  socket.on("GetRooms", function (callback) {
    callback(rooms)
  });
  socket.on("NewGame", function (newRoom, callback) {
    var newGameIndex = 0;
    if (rooms.length > 0) {
      newGameIndex = rooms.length;
    }
    var tempRoom = {
      name: newRoom.name,
      id: newGameIndex,
      description: newRoom.description,
      host: newRoom.host,
      characters: []
    };
    rooms.push(tempRoom);
    console.log("New Game started: " + tempRoom.name + " | " + tempRoom.description + " | " + tempRoom.host);
    callback(newGameIndex);
  });
  socket.on("JoinGame", function (newPlayer, callback) {
    var newCharacterIndex = 0;
    if (rooms[newPlayer.room].characters.length > 0) {
      newCharacterIndex = rooms[newPlayer.room].characters.length;
    }
    newPlayer.index = newCharacterIndex;
    newPlayer.type = "player";
    newPlayer.isDead = false;
    rooms[newPlayer.room].characters.push(newPlayer);
    console.log("New Player added to room '" + rooms[newPlayer.room].name + "': " + newPlayer.name + " | " + newPlayer.initiative);
    callback(newCharacterIndex);
  });
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });
socket.on("AddMonster", function (newMonster, callback) {
  var newCharacterIndex = 0;
  if (rooms[newMonster.room].characters.length > 0) {
    newCharacterIndex = rooms[newMonster.room].characters.length;
  }
  newMonster.index = newCharacterIndex;
  rooms[newMonster.room].characters.push(newMonster);
  console.log("New Monster added to room '" + rooms[newMonster.room].name + "': " + newMonster.name);
  callback(rooms[newMonster.room]);
});

socket.on("LoadRoom", function (roomId, callback) {
  io.emit("UpdateRoom", {
    room: rooms[roomId]
  });
  callback(rooms[roomId]);
});

socket.on("PlayerUpdate", function (updatedRoom) {
  rooms[updatedRoom.id] = updatedRoom;
  io.emit("UpdateRoom", rooms[updatedRoom.id]);
});

socket.on("DMLeft", function (index) {
  if (rooms[index]) {
    rooms.splice(index, 1);
    console.log("DM left, closing room " + index);
    io.emit("CloseRoom", index);
  }
});

socket.on("PlayerLeft", function (indexes) {
  if (rooms[indexes.room]) {
    rooms[indexes.room].characters.splice(indexes.player, 1);
    io.emit("UpdateRoom", {
      room: rooms[indexes.room]
    });
    console.log("Player " + indexes.player + " left room " + indexes.room);
  }
});

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));


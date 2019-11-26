const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const mysql = require('mysql');
const express = require("express");


const { addUser, moveUser, removeUser, getUser, getUsersInRoom, getRoomList, updateUserInit, updateUserMortality } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const  SELECT_ALL_MONSTERS_QUERY = 'SELECT * FROM monsters';
const  SELECT_ALL_DM_MONSTERS_QUERY = 'SELECT * FROM dmmonsters';


const connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b2a25b050ae62c',
  password: '587949a3ffb5b57',
  database: 'heroku_58566ad6018579b'
});

connection.connect(err => {
  console.log(connection);
  if (err){
    return err;
  }
});


app.use(cors());
app.use(router);


app.get('/monsters', (req, res) =>{
  connection.query(SELECT_ALL_MONSTERS_QUERY, SELECT_ALL_DM_MONSTERS_QUERY, (err, results) =>{
    if (err){
      return res.send(err);
    }else {
      return res.json({
        data: results
      })
    }
  })
});
app.get('/monsters/add', (req, res) =>{
  const {monster_name} = req.query;
const INSERT_MONSTER_QUERY = `INSERT INTO dmmonsters (monster_name) VALUES ('${monster_name}')`;
    connection.query(INSERT_MONSTER_QUERY), (err, results) => {
      if (err){
        return res.send(err)
      }else {
        return res.send('added monster')
      }
    }
});


io.on('connect', (socket) => {
  socket.on('join', ({ name, room, userProfilePhoto }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, userProfilePhoto });
    if(error) return callback(null, error);
    socket.join(user.room);
    socket.emit('message', {user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback(user, null);
  });

  socket.on('createMonster', ({ monsterName, room }, callback) => {
    const isMonster = true;
    const name = monsterName;
    const id = socket.id + "-" + Math.random().toString(36).substring(7) + "-" + Math.random().toString(36).substring(7); // this adds two randomized strings to the end of the DM's id so that the monster will have it's own, unique id
    const userProfilePhoto = null;
    const { error, user } = addUser({ id: id, name, room, userProfilePhoto, isMonster });
    if(error) return callback(null, error);
    socket.join(user.room);
    socket.emit('message', {user: 'admin', text: `${user.name} added to game`});
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback(user, null);
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  });

  socket.on('moveUser', ({user, from, to}, callback) => {
    const moveStatus = moveUser({ from, to });
    if (moveStatus) {
      io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
    }
    callback(moveStatus);
  });

  socket.on('updateUserInit', ({tempUser}, callback) => {
    const updatedUser = updateUserInit({ tempUser });
    if (updatedUser) {
      io.to(tempUser.room).emit('message', { user: 'admin', text: `${tempUser.name} init changed to ${tempUser.init}`});
      io.to(tempUser.room).emit('roomData', { room: tempUser.room, users: getUsersInRoom(tempUser.room)});
    }
    callback(updatedUser);
  });

  socket.on('updateUserMortality', ({tempUser}, callback) => {
    const updatedUser = updateUserMortality({ tempUser });
    if (updatedUser) {
      io.to(tempUser.room).emit('message', { user: 'admin', text: `${tempUser.name} mortality changed to ${tempUser.isAlive}`});
      io.to(tempUser.room).emit('roomData', { room: tempUser.room, users: getUsersInRoom(tempUser.room)});
    }
    callback(updatedUser);
  });

  socket.on('getRooms', (callback) => {
    const {roomList} = getRoomList();
    callback(roomList);
  });

});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

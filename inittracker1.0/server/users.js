let users = [];

const addUser = ({ id, name, room, userProfilePhoto = null, isMonster = false }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  let init = 0;
  let isDm = false;
  let isAlive = true;
  if (users.length <= 0) {
    isDm = true;
  }
  const existingUser = users.find((user) => user.room === room && user.name === name);
  if(!name || !room) return { error: 'Username and room are required.' };
  if(!isMonster && existingUser) return { error: 'Username is taken.' };
  const user = { id, name, room, init, isDm, isMonster, isAlive, userProfilePhoto };
  users.push(user);
  return { user };
};

const moveUser = ({ from, to }) => {
  let movedUser = users[from];
  if (movedUser) {
    users.splice(from, 1);
    users.splice(to, 0, movedUser);
    return users;
  } else {
    return false;
  }
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if(index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getRoomList = () => {
  let roomList = [];
  users.forEach(user => {
    if (user.isDm) {
      roomList.push(user.room);
    }
  });
  return { roomList };
};

const updateUserInit = ({tempUser}) => {
  const index = users.findIndex((user) => user.id === tempUser.id);
  if (index > 0) {
    users[index].init = tempUser.init;
    return users[index];
  } else {
    return false;
  }
};

const updateUserMortality = ({tempUser}) => {
  const index = users.findIndex((user) => user.id === tempUser.id);
  if (index > 0) {
    users[index].isAlive = tempUser.isAlive;
    return users[index];
  } else {
    return false;
  }
};

module.exports = { addUser, moveUser, removeUser, getUser, getUsersInRoom, getRoomList, updateUserInit, updateUserMortality };

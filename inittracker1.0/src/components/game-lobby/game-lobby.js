import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

const GameLobby = ({ location }) => {
    const [name, setName] = useState('');
    const [roomid, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000/';
    const [dm, setDm] = useState('');
    let room_obj = {};
    let loaded = false;

    useEffect(() => {
        const { name, roomid, dm} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(roomid);
        setName(name);

        socket.emit('LoadRoom', roomid, (loadedRoom) => {
            console.log(loadedRoom)
        });
    }, [ENDPOINT, location.search]);

    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         setMessages([...messages, message ]);
    //     });
    //
    //     socket.on('roomData', ({ users }) => {
    //         setUsers(users);
    //     });
    //
    //     return () => {
    //         socket.emit('disconnect');
    //
    //         socket.off();
    //     }
    // }, [messages]);


    return (
        <div className="outerContainer">
            <div className="container">
                <h1>!</h1>
            </div>
        </div>
    );
};

export default GameLobby;




// import React, { useState, useEffect } from "react";
// import queryString from 'query-string';
// import io from 'socket.io-client';
// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';
//
//
// let socket = require('socket.io-client')('http://127.0.0.1:5000');
//
// const GameLobby = ({ location }) => {
//     const [dm, setDm] = useState('');
//     const [name, setName] = useState('');
//     const [room, setRoom] = useState('');
//     const [users, setUsers] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [] = 'http://localhost:5000';
//     let room_obj = {};
//     let loaded = false;
//
//
//
//     useEffect(() => {
//         socket = io();
//         const { name, room, dm } = queryString.parse(location.search);
//         if (room != null) {
//             console.log("!");
//             socket.emit("LoadRoom", room, function(loadedRoom) {
//                 console.log("Loaded Room", loadedRoom);
//                 room_obj = loadedRoom;
//                 // RefreshPlayerList();
//                 // getMonsters();
//                 if (!dm) {
//                     // $dmTools.hide();
//                 }
//                 loaded = true;
//             });
//         } else {
//             console.log("Loading Game room failed, handle elegantly");
//         }
//     }, [ location.search]);
//
//
//     //
//     // useEffect(() => {
//     //     socket.on('message', (message) => {
//     //         setMessages([...messages, message ]);
//     //     });
//     //
//     //     socket.on('roomData', ({ users }) => {
//     //         setUsers(users);
//     //     });
//     //
//     //     return () => {
//     //         socket.emit('disconnect');
//     //
//     //         socket.off();
//     //     }
//     // }, [messages])
//     //
//     // const sendMessage = (event) => {
//     //     event.preventDefault();
//     //
//     //     if(message) {
//     //         socket.emit('sendMessage', message, () => setMessage(''));
//     //     }
//     // };
//
//     return (
//         <div className="outerContainer">
//             <div className="container">
//                 <InfoBar room={room} />
//                 {/*<Messages messages={messages} name={name} />*/}
//                 {/*<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />*/}
//             </div>
//             <TextContainer users={users}/>
//         </div>
//     );
// };
//
// export default GameLobby;
//
//
//
//
//
//
//
//

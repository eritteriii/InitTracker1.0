import React, {useState} from 'react';
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

let socket;


export default function CreateGame() {
    const [dmName, setName] = useState('');
    const [roomName, setRoom] = useState('');
    const ENDPOINT = 'http://localhost:5000/';
    let tempIndex = null;
    let history = useHistory();


    function createGame(e) {
        if (!dmName || !roomName){
            e.preventDefault()
        }else{
            let newGame = {
            name: roomName,
            host: dmName
        };
            socket = io(ENDPOINT);
            socket.emit('NewGame', newGame, (gameIndex) => {
                tempIndex = gameIndex;
                history.push(`/game-lobby?name=${dmName}&roomid=${tempIndex}&dm=true`);
                console.log(gameIndex)
            });
            return true
        }

    }



    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="DMName" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="GameName" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                    <button onClick={createGame} className={'button mt-20'} type="submit">Sign In</button>
                </div>
        </div>
    );
}

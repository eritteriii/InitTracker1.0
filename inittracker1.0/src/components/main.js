import React from 'react';
import {Switch, Route} from "react-router-dom";
import SignIn from "./landingpage/landingpage";
import RoleSelect from "./role-select/role-select";
import GameSelect from "./join-game/game-select";
import CreateGame from "./create-game/create-game";
import GameLobby from "./game-lobby/game-lobby";
import Join from "./Join/Join";
import Chat from "./Chat/Chat";


const Main = () => (
    <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route exact path="/role-select" component={RoleSelect}/>
        <Route exact path="/game-select" component={GameSelect}/>
        <Route exact path="/game-create" component={CreateGame}/>
        <Route exact path="/game-lobby" component={GameLobby}/>
        <Route exact path="/chat" component={Chat}/>
        <Route exact path="/join" component={Join}/>
    </Switch>
);

export default Main;





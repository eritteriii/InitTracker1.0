import React, {Component}from 'react';
import './App.css';
import Main from "./components/main";
// import {Button,Drawer} from "@material-ui/core";


class App extends Component {
  render() {

      return (
                <div>
                    <h1 className="banner">Init<i className="fas fa-dice-d20"></i>Tracker</h1>
                    {/*<Button onClick={toggleDrawer('left', true)}>Open Left</Button>*/}
                    {/*<Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>*/}
                    {/*    {sideList('right')}*/}
                    {/*</Drawer>*/}
                    {/*/!*<Nav >*!/*/}
                    {/*/!*    <Nav.Link eventKey={2} href="/create-game">GameCreate</Nav.Link>*!/*/}
                    {/*/!*    <Nav.Link eventKey={3} href="/game-lobby">GameLobby</Nav.Link>*!/*/}
                    {/*/!*    <Nav.Link eventKey={4} href="/game-select">GameSelect</Nav.Link>*!/*/}
                    {/*/!*    <Nav.Link eventKey={5} href="/role-select">RoleSelect</Nav.Link>*!/*/}
                    {/*/!*</Nav>*!/*/}
                    <Main/>
                </div>


              );
  }
}

export default App;


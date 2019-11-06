import React, {Component}from 'react';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from "react-mdl";
import Main from "./components/main";
import {Link} from "react-router-dom";
import GameCreate from "./components/game-create/game-create";
import GameLobby from "./components/game-loby/game-loby";
import GameSelect from "./components/game-select/game-select";

class App extends Component {
  render() {
    return (
        <div className="demo-big-content">
          <Layout>
            <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/">Portfolio</Link>} scroll>
              <Navigation>
                <Link to="/create">GameCreate</Link>
                <Link to="/lobby">GameLobby</Link>
                <Link to="/select">GameSelect</Link>
              </Navigation>
            </Header>
            <Drawer title="Title">
              <Navigation>
                <Link to="/create">GameCreate</Link>
                <Link to="/lobby">GameLobby</Link>
                <Link to="/select">GameSelect</Link>
              </Navigation>
            </Drawer>
            <Content>
              <div className="page-content" />
              <Main/>
            </Content>
          </Layout>
        </div>
    );
  }
}

export default App;

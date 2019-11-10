import React, {Component}from 'react';
import './App.css';
import Main from "./components/main";
import Botnav from "./components/bot-nav"



class App extends Component {
  render() {
      return (
                <div>
                    <h1 className="banner">Init<i className="fas fa-dice-d20"></i>Tracker</h1>
                    <Main/>
                    <div className="bot">
                        <Botnav/>
                    </div>
                </div>

      );
  }
}

export default App;

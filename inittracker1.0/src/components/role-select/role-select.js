import React, {Component}from 'react';

class RoleSelect extends Component {
    render() {
        return (
            <div>
                <p>A simple tool for exasperated Dungeon Masters and their distracted players.</p>
                <h2>Know your role.</h2>

                <a href="gameSelect" className="btn btn-dark btn-lg" id="play-btn">Player
                    <p className="btn-subText">"I'm attacking the darkness."</p>
                </a>

                <a href="gameCreate" className="btn btn-dark btn-lg" id="dm-btn">Dungeon Master
                    <br/>
                        <p className="btn-subText">"You can certainly try."</p>
                </a>
            </div>
        );
    }
}

export default RoleSelect;
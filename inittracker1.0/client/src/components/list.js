import React, {Component}from 'react';


class List extends React.Component {
    state = {
        monsters: []
    };
    state = {
        dmmonsters: []
    };


    componentDidMount = () => {
        this.getMonsters();
    };

    getMonsters = _ => {
        fetch('http://localhost:5000/monsters')
            .then(response => response.json())
            .then(response => this.setState({monsters: response.data}))
            .catch(err => console.error(err))
    };


    renderMonster = ({id, monster_name}) => <div key={id}>{monster_name}</div>;

    render() {
        const {monsters} = this.state;
        return (
            <div className='list'>
                    { monsters && monsters.map(this.renderMonster)}
            </div>
        );
    }
}

export default List;
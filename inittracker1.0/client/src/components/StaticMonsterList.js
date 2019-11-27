import React, {Component, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
const StaticMonsterList = ({createMonster, dmmonsters}) => (
    <List>
        {dmmonsters.map(({id, monster_name}) => (
            <ListItem button onClick={() =>createMonster(monster_name)}><ListItemText key={id}>{monster_name}</ListItemText></ListItem>
        ))}
    </List>
);
export default StaticMonsterList;
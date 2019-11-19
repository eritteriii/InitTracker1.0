import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import JoinModal from '../Join/JoinMod'
import NavDrawer from '../Nav/Nav-Drawer'





const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default function Botnav() {
        const classes = useStyles();



    return (
        <BottomNavigation className={classes.root}>
            <BottomNavigationAction  component={JoinModal} />
        </BottomNavigation>
    );
}
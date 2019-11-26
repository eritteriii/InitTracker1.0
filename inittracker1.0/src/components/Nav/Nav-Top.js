import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './Nav-Top.css'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import JoinModal from '../Join/JoinMod'
import SignIn from "../landingpage/landingpage";




const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

export default function NavTop(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [state, setState] = React.useState({
        left: false,

    });



    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [side]: open});
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            // onClick={toggleDrawer(side, false)}
            // onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {['Home Page', 'Role Select'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <AccountBalanceIcon/> : <EmojiPeopleIcon/>}</ListItemIcon>
                        <ListItemText primary={text} Route exact path="/" component={SignIn}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['Live Chat'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <JoinModal/>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={toggleDrawer('left', true)}>
                        <MenuIcon/>
                    </IconButton>
                    <SwipeableDrawer
                        open={state.left}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        {sideList('left')}
                    </SwipeableDrawer>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                {props.children}
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

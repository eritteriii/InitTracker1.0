import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import "./Join.css";
import firebase from "firebase";
import queryString from "query-string";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}));

function pullRooms(endpoint, cb) {
  socket = io(endpoint);
  socket.emit("getRooms", roomArr => {
    cb(roomArr);
  });
}

function Rendershit(props) {
  console.log("Rooms", props.roomArray);
  return (
    <>
      {props.roomArray
        ? props.roomArray.map((name, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItem>
          ))
        : null}
    </>
  );
}

let socket;

export default function SignIn(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = React.useState(null);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000/";
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  socket = io(ENDPOINT);

  if (rooms === null) {
    console.log("No rooms");
    pullRooms(ENDPOINT, setRooms);
  }
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    firebase.auth().signOut();
    props.history.push("/");
  };

  return (
    <div>
      <div className="joinOuterContainer">
        {/*Begin Nav*/}
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title} />
              {
                <div>
                  {props.isSignedIn ? (
                    <h1>{firebase.auth().currentUser.displayName}</h1>
                  ) : null}
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {props.isSignedIn ? (
                      <img
                        className="profilePix"
                        alt="profile picture"
                        src={firebase.auth().currentUser.photoURL}
                      />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
                  </Menu>
                </div>
              }
            </Toolbar>
          </AppBar>
          <div className="banner">
            <h1 className="banner">
              Init
              <i className="fas fa-dice-d20" />
              Tracker
            </h1>
          </div>
        </div>
        {/*END Nav*/}
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <div>
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              onChange={event => setRoom(event.target.value)}
            />
          </div>
          <Link
            onClick={e => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className={"button mt-20"} type="submit">
              Sign In
            </button>
          </Link>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.title}>
                Find your game or create a new one!
              </Typography>
              <div className={classes.demo}>
                <List dense={dense}>
                  <Rendershit roomArray={rooms} />
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

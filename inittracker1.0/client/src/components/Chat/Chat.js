import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import DmTools from '../Dm-Tools/DmTools'
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
import closeIcon from "../../icons/closeIcon.png";
import firebase from "firebase";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},

	title: {
		flexGrow: 1
	},
	list: {
		width: 250
	}
}));


let socket;

const Chat = (props) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [user, setUser] = useState('');
	const [isDm, setIsDm] = useState('');
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const ENDPOINT = 'https://inittracker1-0.herokuapp.com/';
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [state, setState] = React.useState({
		left: false
	});

	const toggleDrawer = (side, open) => event => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		/>
	);
	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSignOut = () => {
		firebase.auth().signOut();
		props.history.push('/')
	};


	useEffect(() => {
		const {name, room, init} = queryString.parse(props.location.search);

		socket = io(ENDPOINT);

		setRoom(room);
		setName(name);

		const userProfilePhoto = firebase.auth().currentUser.photoURL;
		const userDisplayName = firebase.auth().currentUser.displayName;

		socket.emit('join', {name, room, userProfilePhoto, userDisplayName}, (user, error) => {
			if (error) {
				alert(error);
			}
			setUser(user);
			setIsDm(user.isDm);
			console.log("Your user object", user, "Is DM", user.isDm);
		});
	}, [ENDPOINT, props.location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});

		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [messages]);

	useEffect(() => {
		socket.on('roomData', ({users}) => {
			setUsers(users);
			console.log("Users updated", users);
		});
	});

	const moveUser = (evt) => {
		const from = evt.oldIndex + 1;
		const to = evt.newIndex + 1;
		const user = users[from];
		if (isDm) {
			socket.emit('moveUser', {user, from, to}, (tempUser) => {
				console.log("Moved user", tempUser);
			});
		}
	};

	const endTurn = (index) => {
		const from = index;
		const to = users.length;
		const user = users[from];
		socket.emit('moveUser', {user, from, to}, (tempUser) => {
			console.log("Moved user", tempUser);
		});
	};

	const updateInit = (e) => {
		if (e.target.value) {
			user.init = e.target.value;
			let tempUser = user;
			socket.emit('updateUserInit', {tempUser}, (tempUser) => {
				console.log("Updated user", tempUser);
			});
		}
	};

	function createMonster(monsterName) {
		let isMonster = true;
		socket.emit('createMonster', {monsterName, room, isMonster}, (user, error) => {
			if (error) {
				alert(error);
			}
			console.log("New monster created",user);
		});
	};

	const updateMortality = (userIndex) => {
		if (user.isDm) {
			users[userIndex].isAlive = !users[userIndex].isAlive;
			let tempUser = users[userIndex];
			socket.emit('updateUserMortality', {tempUser}, (tempUser) => {
				console.log("Updated user", tempUser);
			});
		}
	};

	const sendMessage = (event) => {
		event.preventDefault();
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};


	return (
		<div className="outerContainer">
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
							onClick={toggleDrawer("left", true)}

						>
							<ChatRoundedIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title} />
						{
							<div>
								{props.isSignedIn ? (
								<h1>
									{firebase.auth().currentUser.displayName}
								</h1>

								)
									: null }
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

											)

										: <AccountCircle/> }
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
									<DmTools user={user} createMonster={createMonster}/>
									<a href="/"><img src={closeIcon} alt="close icon" /><MenuItem onClick={handleClose}>Leave Game</MenuItem></a>
									<MenuItem onClick={handleSignOut}>Log Out</MenuItem>
								</Menu>

							</div>
						}
					</Toolbar>
				</AppBar>
                <div className="banner">


                <h1 className="banner">Init<i className="fas fa-dice-d20"/>Tracker</h1>
                </div>
                <div>
					<SwipeableDrawer
						open={state.left}
						onClose={toggleDrawer("left", false)}
						onOpen={toggleDrawer("left", true)}
					>

							<InfoBar room={room}/>
							<Messages messages={messages} name={name}/>
							<Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>

					</SwipeableDrawer>
				</div>
			</div>
			{!isDm ? (
				<input placeholder={"Update Initiative"} onChange={ updateInit }/>
			): null}
			<TextContainer dm={isDm} users={users} room={room} moveUser={moveUser} endTurn={endTurn} updateInit={updateInit} updateMortality={updateMortality}/>
		</div>
	);
};

export default Chat;

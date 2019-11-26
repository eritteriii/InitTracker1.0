import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Link} from "react-router-dom";
import './Join.css';
import ChatIcon from '@material-ui/icons/Chat';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

export default function JoinModal() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ListItem type="button" value={value} onChange={handleChange} className={classes.root} onClick={handleOpen}>
                <ListItemIcon label="Chat Window" value="Chat-Window">
                    {<ChatIcon/>} Live Chat
                </ListItemIcon>
            </ListItem>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="joinOuterContainer">
                        <div className="joinInnerContainer">
                            <h1 className="heading">Join</h1>
                            <div>
                                <input placeholder="Name" className="joinInput" type="text"
                                       onChange={(event) => setName(event.target.value)}/>
                            </div>
                            <div>
                                <input placeholder="Room" className="joinInput mt-20" type="text"
                                       onChange={(event) => setRoom(event.target.value)}/>
                            </div>
                            <Link onClick={e => (!name || !room) ? e.preventDefault() : null}
                                  to={`/chat?name=${name}&room=${room}`}>
                                <button className={'button mt-20'} type="submit">Sign In</button>
                            </Link>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

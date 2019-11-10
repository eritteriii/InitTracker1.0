import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    fab: {
        margin: theme.spacing(1),
    },
    AddCircleIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function CreateGame() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
        <div className={classes.container}>
            <div>
                <TextField
                    id="outlined-full-width"
                    label="DM Name"
                    style={{ margin: 8 }}
                    placeholder="What Is Your Name?"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="Game Name"
                    style={{ margin: 8 }}
                    placeholder="What Is Your Favorite Color?"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="Campian Name"
                    style={{ margin: 8 }}
                    placeholder="What Is The Airspeed Velocity of An Unladen Swallow"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <Fab variant="extended" aria-label="like" className={classes.fab}>
                    <AddCircleIcon className={classes.extendedIcon} />
                    Create Game!
                </Fab>
            </div>
        </div>
            </Container>
        </React.Fragment>
    );
}
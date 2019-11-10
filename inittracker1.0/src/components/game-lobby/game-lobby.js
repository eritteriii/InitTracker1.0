import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        boxShadow: "7px 9px .5px #9E9E9E",
    },
    text: {
        fontSize: "6px !important",
    },

}));

export default function FullWidthGrid() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
        <div className={classes.root}>
            <h2>Welcome to the game!</h2>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}><Avatar className={classes.orangeAvatar}>N</Avatar>
                    </Paper>
                </Grid>
                <Grid item xs={5} sm={6}>
                    <Paper className={classes.paper}>
                        <p className={classes.text}>PLayer  and Init</p>
                        <hr/>
                        <p className={classes.text}>About the player</p>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Paper className={classes.paper}>
                        <Grid item>
                            <IconButton className={classes.button} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
            </Container>
        </React.Fragment>
    );
}

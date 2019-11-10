import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from "@material-ui/core/Fab";




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
    container1: {

        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    fab: {
        margin: theme.spacing(1),
    },
    AddCircleIcon: {
        marginRight: theme.spacing(1),
    },
}));







export default function GameSelect() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleChange = event => {
        setAge(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
            <h2>Join the fray!</h2>
        <div className={classes.container}>
            <div>
                <TextField
                    id="outlined-full-width"
                    label="Name"
                    style={{ margin: 8 }}
                    placeholder="Character name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}

                />
                <TextField
                    id="outlined-full-width"
                    label="Initiative"
                    style={{ margin: 8 }}
                    placeholder="Character initiative"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,

                    }}
                />
            </div>
        </div>
                <div>
                    <Fab variant="extended" aria-label="like" className={classes.fab} onClick={handleClickOpen}>
                        Join A Game!
                    </Fab>
                    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle>Games List!</DialogTitle>
                        <DialogContent>
                            <form className={classes.container2}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="demo-dialog-native">Game Name</InputLabel>
                                    <Select
                                        native
                                        value={age}
                                        onChange={handleChange}
                                        input={<Input id="demo-dialog-native" />}
                                    >
                                        <option value="" />
                                        <option value={10}>...</option>
                                    </Select>
                                </FormControl>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Join Game!
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        </Container>
        </React.Fragment>
    );
}
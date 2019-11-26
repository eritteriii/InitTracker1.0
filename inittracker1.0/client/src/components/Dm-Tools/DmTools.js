import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from "@material-ui/core/MenuItem";
import MonsterList from "./Db-List";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useTheme from "@material-ui/core/styles/useTheme";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


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
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

export default function DmTools({user, updateInit, moveUser, createMonster, updateMortality}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {
                user.isDm ? (
                    <MenuItem onClick={handleOpen}>DM Tools!</MenuItem>
                ) : null
            }
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
                    <div className={classes.paper}>
                        <div>
                            <div className={classes.root}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Item One" {...a11yProps(0)}
                                        />
                                        <Tab label="Item Two" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <MonsterList/>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <MonsterList/>
                                    </TabPanel>
                                </SwipeableViews>
                            </div>

                            {/*<button onClick={e => updateInit(e, 1, 3)}>*/}
                            {/*    Update Init of user at index 1 to 3*/}
                            {/*</button><br/>*/}
                            {/*<button onClick={e => moveUser(e, 1, 2)}>*/}
                            {/*    Move player at index 1 to index 2*/}
                            {/*</button><br/>*/}
                            {/*<button onClick={e => createMonster(e, "Dragon")}>*/}
                            {/*    Create Monster "Dragon"*/}
                            {/*</button><br/>*/}
                            {/*<button onClick={e => updateMortality(e, 1)}>*/}
                            {/*    Toggle mortality of user at index 1*/}
                            {/*</button><br/>*/}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


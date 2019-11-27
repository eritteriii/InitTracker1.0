import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useTheme from "@material-ui/core/styles/useTheme";
import PlayerMonsterList from "../PlayerMonsterList";
import StaticMonsterList from  '../StaticMonsterList';

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

export default function DmTools({user, createMonster}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [monsters, setMonsters] = React.useState([]);
    const [dmmonsters, setDmMonsters] = React.useState([]);
    const [newMonster, setNewMonster] = React.useState("");

    const handleMonsterInputChange = (e) => {
        setNewMonster(e.target.value);
    };

    const handleMonsterSubmit = () => {
        console.log("Submitting monster to DB", newMonster);
        let tempMonsters = monsters;
        tempMonsters.push(newMonster);
        setMonsters(tempMonsters);
        fetch('http://localhost:5000/monsters/add/?monster_name=' + newMonster)
            .then(response => response.json())
            .then(response => {console.log("Monster add response", response)})
            .catch(err => console.error(err));
        fetch('http://localhost:5000/monsters')
            .then(response => response.json())
            .then(response => setMonsters(response.data))
            .catch(err => console.error(err))
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const handleOpen = () => {
        if (monsters.length <= 0) {
            fetch('http://localhost:5000/monsters')
                .then(response => response.json())
                .then(response => setMonsters(response.data))
                .catch(err => console.error(err))
        }
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
                                        <Tab label="Preset Monsters" {...a11yProps(0)}
                                        />
                                        <Tab label="Custom Monsters" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        {/*TODO: filter functionality*/}
                                        <StaticMonsterList createMonster={createMonster} dmmonsters={dmmonsters}/>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        {/*TODO: add new monster functionality*/}
                                        <input onChange={handleMonsterInputChange} /><button onClick={handleMonsterSubmit}>Add</button>
                                        <PlayerMonsterList createMonster={createMonster} monsters={monsters}/>
                                    </TabPanel>
                                </SwipeableViews>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


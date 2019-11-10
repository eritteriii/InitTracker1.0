import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SmsIcon from '@material-ui/icons/Sms';

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default function Botnav() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Home Page" value="Home" icon={<AccountBalanceIcon />} />
            <BottomNavigationAction label="Hate Us" value="Hate" icon={<SentimentVeryDissatisfiedIcon />} />
            <BottomNavigationAction label="Love Us" value="Love" icon={<SentimentVerySatisfiedIcon />} />
            <BottomNavigationAction label="Chat Window" value="Chat Window" icon={<SmsIcon />} />
        </BottomNavigation>
    );
}
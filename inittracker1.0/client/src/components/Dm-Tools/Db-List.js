import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        width: '100%',
        height: 'auto',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};



export default function MonsterList() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <h1>Add A Monster!</h1>
            <FixedSizeList height={400} width={360} itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
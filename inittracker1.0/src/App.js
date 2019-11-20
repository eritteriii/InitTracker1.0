import React, {Component}from 'react';
import './App.css';
import Main from "./components/main";
import firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavTop from './components/Nav/Nav-Top'
import AccountCircle from '@material-ui/icons/AccountCircle';




firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "inittracker-882f6.firebaseapp.com"
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                No Touchy!
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
// function signOut() {
//
// }

class App extends Component {
    state = { isSignedIn: false };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    };

    render() {
        return (

            <div className="App">
                <NavTop>
                    {this.state.isSignedIn ? (
                    <img
                        className="profilePix"
                        alt="profile picture"
                        src={firebase.auth().currentUser.photoURL}

                    />)
                    : <AccountCircle/> }
                </NavTop>
                <h1 className="banner">Init<i className="fas fa-dice-d20"></i>Tracker</h1>
                <Main/>
                {this.state.isSignedIn ? (
                    <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>{firebase.auth().currentUser.displayName}</h1>
          </span>
                ) : (
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
                <Box mt={8}>
                    <Copyright />
                </Box>
            </div>
        )
    }
}

export default App;

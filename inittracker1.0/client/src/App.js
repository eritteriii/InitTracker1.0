import React, {Component}from 'react';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import './App.css'

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



class App extends React.Component {
    state = { isSignedIn: false };
    state = {
        items: [1, 2, 3, 4, 5, 6]
    };

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
        });
    };


    render() {
        return (
            <div>
                <Router>
                    <Route path="/" render={(props) =>  <Landing {...props} isSignedIn={this.state.isSignedIn} />} />
                    <Route path="/join" render={(props) =>  <Join {...props} isSignedIn={this.state.isSignedIn} />} />
                    <Route path="/chat" render={(props) =>  <Chat {...props} isSignedIn={this.state.isSignedIn} />} />
                </Router>
                <div>
                    {!this.state.isSignedIn ?  (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    ):null}
                    <Copyright />
                </div>
            </div>
        );
    }
}

export default App;

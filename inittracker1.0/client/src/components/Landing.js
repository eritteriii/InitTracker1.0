import React, {Component}from 'react';
import { Redirect } from 'react-router'

const Landing = (props) => {
	console.log("Is signed in", props.isSignedIn);
	return(
		props.isSignedIn ? (
			<Redirect push to="/join"/>
		) : null
	);
};

export default Landing;

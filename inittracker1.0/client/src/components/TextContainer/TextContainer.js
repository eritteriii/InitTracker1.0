import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import Grid from '@material-ui/core/Grid';
import isAliveIcon from '../../icons/isAliveIcon.png';
import isDeadIcon from '../../icons/isDeadIcon.png';
import './TextContainer.css';
import AccountCircle from "@material-ui/core/SvgIcon/SvgIcon";

const TextContainer = ({users, room}) => (
	<div className="textContainer">
		{
			users
				? (
					<div>
						<div className="hostBanner">
							<h2 className='item'>Game Room:</h2><h2 className='item'> {room}</h2><h2 className='item'>Hosted By:</h2><h2 className='item'>{users[0].name}</h2>
						</div>
						<hr/>
						<div className="activeContainer" >
							{users.map(({name, init, isDm, isMonster, isAlive, userProfilePhoto}, index) => !isDm ? (
								<Paper key={index} className="activeItem">
									<Typography component="p">
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
												{userProfilePhoto ? (
														<img
															className="profilePix"
															alt="profile picture"
															src={userProfilePhoto}

														/>)
													: <AccountCircle/> }
                                            </Grid>
                                            <Grid item xs={3}>
                                                { isAlive ? ( <img className='lifeImg' alt="Online Icon" src={isAliveIcon}/> ) : <img className='lifeImg' alt="Offline Icon" src={isDeadIcon}/> }
                                            </Grid>
                                            <Grid item xs={3}>
                                                <p>{name} { !isMonster ? ( `character initiative - ${init}`) : null }</p>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Fab className="action"  aria-label="add">
                                                    <AddIcon />
                                                </Fab>
                                                <Fab className="action"  aria-label="edit">
                                                    <FavoriteOutlinedIcon />
                                                </Fab>
                                                <Fab className="action"  aria-label="edit">
                                                    <ArrowForwardIosIcon />
                                                </Fab>
                                            </Grid>
                                        </Grid>
									</Typography>
								</Paper>
							): null )}
						</div>
					</div>
				)
			: null
		}
	</div>
);
export default TextContainer;

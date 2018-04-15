import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ManageHeader.css';

class HomepageHeader extends Component {
	render() {
		return (
			<div className="home-heading">
				<div className="home-background" />
				<div className="home-content">
					<Grid>
						<Grid.Row divided>
							<Grid.Column width={9}> 
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default HomepageHeader;

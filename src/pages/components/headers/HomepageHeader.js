import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './ManageHeader.css';

class HomepageHeader extends Component {
	render() {
		return (
			<div className="home-heading">
				<div className="home-background bg-color-header-home" />
				<div className="home-content">
					<Grid>
						<Grid.Row divided>
							<Grid.Column width={9} />
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default HomepageHeader;

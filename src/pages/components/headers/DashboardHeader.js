import React, { Component } from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';
import './ManageHeader.css';

const faculty = {
	name : 'Recario, Reginald',
	email : 'rerecario@up.edu.ph',
	tload : 21 
}

class DashboardHeader extends Component {
	render() {
		return (
			<div className="db-heading">
				<div className="db-background bg-color-nav-faculty" />
				<div className="heading-content font-white">
					<p className="db-name">
						{faculty.name.toUpperCase()}
					</p>
					<p className="db-email">
						<Icon name="mail outline" />{'\t'}{faculty.email}
					</p>
				</div>
			</div>
		);
	}
}

export default DashboardHeader;

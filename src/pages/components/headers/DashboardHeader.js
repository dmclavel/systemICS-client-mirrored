import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import './ManageHeader.css';

class DashboardHeader extends Component {
	render() {
		return (
			<div className="db-heading">
				<div className="db-background bg-color-nav-faculty" />
				<div className="heading-content font-white">
					<p className="db-name">{this.props.user.ig.toUpperCase()}</p>
					<p className="db-email">
						<Icon name="mail outline" />
						{'\t'}
						{this.props.user.U3}
					</p>
				</div>
			</div>
		);
	}
}

export default DashboardHeader;

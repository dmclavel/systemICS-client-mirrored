import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ManageHeader.css';

const user = {
	name: 'Reginald'
};

class ManageHeader extends Component {
	constructor(props){
		super(props)
		this.state = {
			userType: ''
		}
	}
	componentDidMount = () => {
		var userType = '';
		if(this.props.accessLvl === 1) userType= 'faculty';
		else if (this.props.accessLvl === 2) userType= 'regcom';
		else userType= 'admin'
		this.setState({
			userType:userType
		});
	}

	render() {
		return (
			<div className="db-heading">
				<div className="db-background bg-color-nav-admin" />
				<div className="heading-content">
					<Grid>
						<Grid.Row>
							<Grid.Column width={1} />
							<Grid.Column width={7}>
								<p className="heading-message">
									Ready to work, {this.props.user.ofa}?<br />
								</p>
								<p class="heading-submessage">
									You are working as the{' '}
									{this.props.accessLvl === 3
										? 'administrator'
										: 'registration committee.'}
								</p>
							</Grid.Column>
							<Grid.Column width={2}>
								{this.props.accessLvl === 3 ? (
									<div>
										<Link to="/admin/manage/courses">
											<Button
												className="centered-h"
												circular
												icon="book huge"
											/>
										</Link>
										<p className="admin-button-caption">Course Offering</p>
									</div>
								) : null}
							</Grid.Column>
							<Grid.Column width={2} className="remove-padding">
								{this.props.accessLvl === 3 ? (
									<div>
										<Link to="/admin/manage/users">
											<Button
												className="admin-button centered-h"
												circular
												icon="id badge outline huge"
											/>
										</Link>
										<p className="admin-button-caption">Users</p>
									</div>
								) : null}
							</Grid.Column>
							<Grid.Column width={2}>
								<Link to={`/${this.state.userType}/manage/advisees`}>
									<Button
										className="admin-button centered-h"
										circular
										icon="user plus huge"
									/>
								</Link>
								<p className="admin-button-caption">Advisees</p>
							</Grid.Column>

							<Grid.Column width={2} className="remove-padding">
								<Link to={`/${this.state.userType}/manage/teaching`}>
									<Button
										className="admin-button"
										circular
										icon="clipboard huge"
									/>
								</Link>
								<p className="admin-button-caption">Teaching Load</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default ManageHeader;

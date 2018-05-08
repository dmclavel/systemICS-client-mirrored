import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ManageHeader.css';

class ManageHeader extends Component {
	render() {
		return (
			<div className="flex-container bg-color-nav-admin">
				<div className="flex-message">
					<p className="heading-message">
						Ready to work, {this.props.user.ofa}?<br />
					</p>
					<p class="heading-submessage">
						You are working as the{' '}
						{this.props.accessLvl === 3
							? 'administrator'
							: 'registration committee.'}
					</p>
				</div>
				{this.props.accessLvl === 3 && (
					<div className="flex-button">
						<Link to="/admin/manage/courses">
							<div className="centered-h">
								<Button className="flex-button-in" circular icon="book huge" />
							</div>
						</Link>
						<p className="admin-button-caption">Course Offering</p>
					</div>
				)}
				<div className="flex-button">
					<Link
						to={`/${
							this.props.accessLvl === 2 ? 'regcom' : 'admin'
						}/manage/advisees`}
					>
						<div className="centered-h">
							<Button
								className="flex-button-in"
								circular
								icon="user plus huge"
							/>
						</div>
					</Link>
					<p className="admin-button-caption">Advisees</p>
				</div>
				<div className="flex-button">
					{' '}
					<Link
						to={`/${
							this.props.accessLvl === 2 ? 'regcom' : 'admin'
						}/manage/teaching`}
					>
						<div className="centered-h">
							<Button
								className="flex-button-in"
								circular
								icon="clipboard huge"
							/>
						</div>
					</Link>
					<p className="admin-button-caption">Teaching Load</p>
				</div>
				{this.props.accessLvl === 3 && (
					<div className="flex-button">
						<Link to="/admin/manage/users">
							<div className="centered-h">
								<Button
									className="flex-button-in"
									circular
									icon="id badge outline huge"
								/>
							</div>
						</Link>
						<p className="admin-button-caption">Users</p>
					</div>
				)}
			</div>
		);

		{
			/*return (
			<div className="db-heading">
				{console.log(this.props.accessLvl)}
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
							<Grid.Column width={2}>
								<Link
									to={`/${
										this.props.accessLvl === 2 ? 'regcom' : 'admin'
									}/manage/advisees`}
								>
									<Button
										className="admin-button centered-h"
										circular
										icon="user plus huge"
									/>
								</Link>
								<p className="admin-button-caption">Advisees</p>
							</Grid.Column>

							<Grid.Column width={2} className="remove-padding">
								<Link
									to={`/${
										this.props.accessLvl === 2 ? 'regcom' : 'admin'
									}/manage/teaching`}
								>
									<Button
										className="admin-button centered-h"
										circular
										icon="clipboard huge"
									/>
								</Link>
								<p className="admin-button-caption">Teaching Load</p>
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
						</Grid.Row>
					</Grid>
				</div>
			</div>
		); */
		}
	}
}

export default ManageHeader;

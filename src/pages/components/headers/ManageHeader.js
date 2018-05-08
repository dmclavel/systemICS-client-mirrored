import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
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
	}
}

export default ManageHeader;

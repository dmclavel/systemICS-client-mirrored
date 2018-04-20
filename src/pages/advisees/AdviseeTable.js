import React, { Component } from 'react';
import { Table, Dropdown, Button, Grid, Icon } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import AdviseeSingle from './AdviseeSingle';
import autobind from 'react-autobind';

class AdviseeTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: 'https://sleepy-falls-95372.herokuapp.com',
			advisees: []
		};
		autobind(this);
	}
	componentDidMount() {
		const socket = socketIOClient(this.state.endpoint);

		socket.on('update_alert', update => {
			socket.emit('view_advisee_advisers', { enrolledOnly: true });
		});

		socket.emit('view_advisee_advisers', { enrolledOnly: true });
		socket.on('view_advisee_advisers', advisees => {
			console.log(advisees);
			let advisees_list = [];
			advisees.forEach(advisee => {
				advisees_list.push({
					key: advisee.student_number,
					adviser_advisee_id: advisee.adviser_advisee_id,
					name: advisee.name,
					advisers: advisee.advisers
				});
			});
			this.setState({ advisees: advisees_list });
		});
	}

	render() {
		return (
			<div>
				{this.state.advisees
					.filter(information => {
						if (
							information.name
								.toLowerCase()
								.includes(this.props.search.toLowerCase())
						) {
							return true;
						}
						return false;
					})
					.map(advisee_single => <AdviseeSingle advisee={advisee_single} />)}
			</div>
		);
	}
}

export default AdviseeTable;

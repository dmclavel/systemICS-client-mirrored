import React, { Component } from 'react';
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
			this.setState({ advisees: [] });
			let advisees_list = [];
			advisees.forEach(advisee => {
				advisees_list.push({
					key: advisee.student_number,
					name: advisee.name,
					advisers: advisee.advisers.length === 0 ? null : advisee.advisers
				});
			});
			this.setState({ advisees: advisees_list });
		});
	}

	render() {
		return (
			<div>
				{this.state.advisees
					.filter(information =>
						information.name
							.toLowerCase()
							.includes(this.props.search.toLowerCase())
					)
					.map(advisee_single => (
						<AdviseeSingle
							advisee={advisee_single}
							hasPending={
								advisee_single.advisers === null
									? false
									: advisee_single.advisers.length === 1 &&
									  advisee_single.advisers[0].status === 'Pending'
										? true
										: advisee_single.advisers.length > 1 &&
										  advisee_single.advisers[1].status === 'Pending'
											? true
											: false
							}
						/>
					))}
			</div>
		);
	}
}

export default AdviseeTable;

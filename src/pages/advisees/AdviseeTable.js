import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import AdviseeSingle from './AdviseeSingle';
import autobind from 'react-autobind';
import config from './../../config.json';

class AdviseeTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: config.backendAddress,
			advisees: [],
			loading: true
		};
		autobind(this);
	}
	componentDidMount() {
		this.setState({ loading: true });
		const socket = socketIOClient(this.state.endpoint);
		socket.on('update_alert', update => {
			socket.emit('view_advisee_advisers', { enrolledOnly: true });
		});

		socket.emit('view_advisee_advisers', { enrolledOnly: true });
		socket.on('view_advisee_advisers', advisees => {
			let advisees_list = [];
			advisees.forEach(advisee => {
				advisees_list.push({
					key: advisee.student_number,
					name: advisee.name,
					advisers: advisee.advisers.length === 0 ? null : advisee.advisers
				});
			});
			this.setState({ advisees: advisees_list, loading: false });
		});
	}

	render() {
		const { loading } = this.state;
		return (
			<div>
				<Loader active={loading} content="Loading..." />
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

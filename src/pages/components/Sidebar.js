import React, { Component } from 'react';
import {
	Segment,
	Header,
	Grid,
	Item,
	Button,
	Dropdown
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import config from './../../config.json';
import DropFile from '../admin/DropFile';

const inline = {
	width: '100rem',
	height: '25rem',
	'overflow-y': 'auto'
};

const inline1 = {
	width: '100rem'
};

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: config.backendAddress,
			semesters: [],
			acad_year: 0,
			semester: 0,
			logs: []
		};
	}

	componentDidMount() {
		const socket = socketIOClient(this.state.address); //establish connection to the server
		socket.emit('view_timeframe', {});
		socket.on('view_timeframe', semesters => {
			this.setState({
				acad_year: semesters[semesters.length - 1].acad_year,
				semester: semesters[semesters.length - 1].semester
			});

			const tempSem = [];
			semesters.forEach((semester, index) => {
				tempSem.push({
					key: index,
					value: {
						acad_year: semester.acad_year,
						semester: semester.semester
					},
					text: `${
						semester.semester === 1
							? '1st Semester'
							: semester.semester === 2
								? '2nd Semester'
								: 'Midyear'
					} AY ${semester.acad_year}-${semester.acad_year + 1}`
				});
			});
			this.setState({ semesters: tempSem });
		});
		socket.emit('view_log_table', {});
		socket.on('view_log_table', logs => {
			this.setState({ logs: logs });
			console.log(this.state.logs);
		});
	}

	handleOnChange = (e, data) => {
		this.props.handleChangeSemester(data.value.acad_year, data.value.semester);
		this.setState({
			acad_year: data.value.acad_year,
			semester: data.value.semester
		});
	};

	handleAddSemester = () => {
		const socket = socketIOClient(this.state.address);
		socket.emit('create_timeframe', {});
	};

	handleDeleteSemester = () => {
		const socket = socketIOClient(this.state.address);
		socket.emit('remove_timeframe', {});
	};

	render() {
		const { semesters, acad_year, semester } = this.state;
		return (
			<Grid>
				<Grid.Row className="sidebar">
					<Segment style={inline1} fluid textAlign="right">
						<Header as="h3">
							<Header.Content>
								{this.props.showSemester
									? `${
											semester === 1
												? '1st Semester'
												: semester === 2
													? '2nd Semester'
													: 'Midyear'
									  } AY ${acad_year}-${acad_year + 1}`
									: `${
											semester === 1
												? '1st Semester'
												: semester === 2
													? '2nd Semester'
													: 'Midyear'
									  } AY ${acad_year}-${acad_year + 1}`}
							</Header.Content>
							<Header.Subheader>
								<span>
									Current Semester{' '}
									{this.props.showSemester && (
										<Dropdown
											placeholder="Change semester"
											inline
											options={semesters}
											header={
												<div>
													<Button.Group>
														<Link to="/admin/manage/courses">
															<Button
																basic
																positive
																content="Add New Semester"
																size="small"
																onClick={this.handleAddSemester}
															/>
														</Link>
														<Link to="/admin/manage/courses">
															<Button
																basic
																negative
																content="Delete Latest Semester"
																size="small"
																onClick={this.handleDeleteSemester}
															/>
														</Link>
													</Button.Group>
												</div>
											}
											onChange={this.handleOnChange}
											value={semesters[semesters.length - 1]}
											text={`Change Semester`}
										/>
									)}
								</span>
							</Header.Subheader>
						</Header>
					</Segment>
				</Grid.Row>
				<Grid.Row>
					<Segment style={inline}>
						<Item.Group divided>
							{this.state.logs.map((item, index) => (
								<Item key={index}>
									<Item.Content verticalAlign="middle" textAlign="left">
										{item.date_and_time_accessed + ' : '}
										<b>{item.comment}</b>
									</Item.Content>
								</Item>
							))}
						</Item.Group>
					</Segment>
				</Grid.Row>
				<Grid.Row>
					{this.props.accessLvl === 3 && (
						<Button.Group fluid>
							<DropFile />
							<Button.Or />
							<Link to="/admin/generate_report">
								<Button color="teal" content="Generate Course Report" />
							</Link>
						</Button.Group>
					)}
				</Grid.Row>
			</Grid>
		);
	}
}

export default Sidebar;

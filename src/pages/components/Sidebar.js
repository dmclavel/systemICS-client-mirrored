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

import DropFile from '../admin/DropFile';

const items = [
	{
		key: 1,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 2,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 3,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 4,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 5,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 6,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 7,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 8,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 9,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	},
	{
		key: 10,
		content: (
			<div>
				<strong>{`CMSC 123 T-1L`}</strong> was assigned to{' '}
				<strong>{`Reginald Recario`}.</strong>
			</div>
		)
	}
];

const inline = {
	width: '100rem',
	height: '25rem',
	'overflow-y': 'auto'
};

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com',
			semesters: []
		};
	}

	componentDidMount() {
		const socket = socketIOClient(this.state.address);
		socket.emit('view_timeframe', null);
		socket.on('view_timeframe', semesters => {
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
	}

	handleOnChange = (e, data) => {
		this.props.handleChangeSemester(data.value.acad_year, data.value.semester);
		console.log(data.value);
	};

	render() {
		const { semesters, acad_year, semester } = this.state;
		return (
			<Grid>
				<Grid.Row className="sidebar">
					<Segment className="sidebar-container" fluid textAlign="right">
						<Header as="h2">
							<Header.Content>{`${
								this.props.current_sem === 1
									? '1st Semester'
									: this.props.current_sem === 2
										? '2nd Semester'
										: 'Midyear'
							} AY ${this.props.current_year}-${this.props.current_year +
								1}`}</Header.Content>
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
														<Button
															basic
															positive
															content="Add New Semester"
															size="small"
														/>
														<Button
															basic
															negative
															content="Delete Current Semester"
															size="small"
														/>
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
							{items.map((item, index) => (
								<Item key={index}>
									<Item.Content verticalAlign="middle" textAlign="left">
										{item.content}
									</Item.Content>
								</Item>
							))}
						</Item.Group>
					</Segment>
				</Grid.Row>
				<Grid.Row>
					<Button.Group fluid>
						<DropFile />
						<Button.Or />
						<Link to="/admin/generate_report">
							<Button color="teal" content="Generate Course Report" />
						</Link>
					</Button.Group>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Sidebar;

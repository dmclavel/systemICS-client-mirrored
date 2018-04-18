import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import './ViewCourses.css';

class ViewCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			courses: []
		};
	}

	componentDidMount() {
		const socket = socketIOClient(this.state.address);
		const data = { email: 'jcgaza@up.edu.ph' };
		socket.emit('view_existing_courses', data);
		socket.on('view_existing_courses', result => {
			this.setState({ courses: result });
		});
	}

	render() {
		const { courses } = this.state;
		return (
			<div>
				<Table className="remove-margin">
					<Table.Header textAlign="center">
						<Table.HeaderCell width={3}>Course ID</Table.HeaderCell>
						<Table.HeaderCell width={3}>Course Title</Table.HeaderCell>
						<Table.HeaderCell width={6}>Course Description</Table.HeaderCell>
						<Table.HeaderCell width={2}>Actions</Table.HeaderCell>
					</Table.Header>
				</Table>
				<div className="courses-table">
					<Table>
						<Table.Body fluid>
							{courses.map(course => {
								return (
									<Table.Row>
										<Table.Cell width={3}>{course.course_name}</Table.Cell>
										<Table.Cell width={3}>{course.course_title}</Table.Cell>
										<Table.Cell width={6}>{course.description}</Table.Cell>
										<Table.Cell width={2}>
											<Button basic circular color="blue" icon="edit" />
											<Button basic circular color="red" icon="close" />
										</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				</div>
			</div>
		);
	}
}

export default ViewCourses;
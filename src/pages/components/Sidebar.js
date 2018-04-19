import React, { Component } from 'react';
import {
	Segment,
	Header,
	Grid,
	Item,
	Button,
	Dropdown
} from 'semantic-ui-react';

import DropFile from '../admin/DropFile';

const items = [
	{ key: 1, content: 'Hello hello hello' },
	{ key: 2, content: 'Hello hello hello' },
	{ key: 3, content: 'Hello hello hello' },
	{ key: 4, content: 'Hello hello hello' },
	{ key: 5, content: 'Hello hello hello' },
	{ key: 6, content: 'Hello hello hello' },
	{ key: 7, content: 'Hello hello hello' },
	{ key: 8, content: 'Hello hello hello' },
	{ key: 9, content: 'Hello hello hello' },
	{ key: 10, content: 'Hello hello hello' },
	{ key: 11, content: 'Hello hello hello' },
	{ key: 12, content: 'Hello hello hello' },
	{ key: 13, content: 'Hello hello hello' },
	{ key: 14, content: 'Hello hello hello' }
];

const options = [
	{
		key: 1,
		value: 'hello',
		text: '1st Semester Ay 2017-2018'
	},
	{
		key: 1,
		value: 'hello',
		text: '1st Semester Ay 2017-2018'
	},
	{
		key: 1,
		value: 'hello',
		text: '1st Semester Ay 2017-2018'
	},
	{
		key: 1,
		value: 'hello',
		text: '1st Semester Ay 2017-2018'
	},
	{
		key: 1,
		value: 'hello',
		text: '1st Semester Ay 2017-2018'
	},
	{
		key: 1,
		value: 'hello',
		text: '1st Semester Ay 2017-2018'
	},
	{
		key: 1,
		value: 'hello',
		text: '1st Semester Ay 2017-2018'
	}
];

const inline = {
	width: '100rem',
	height: '25rem',
	'overflow-y': 'auto'
};

class Sidebar extends Component {
	render() {
		return (
			<Grid>
				{console.log('HEHEHEHHE' + this.props)}
				<Grid.Row className="sidebar">
					<Segment className="sidebar-container" fluid textAlign="right">
						<Header as="h2">
							<Header.Content>1st Semester AY 2017-2018</Header.Content>
							<Header.Subheader>
								<span>
									Current Semester{' '}
									{this.props.showSemester && (
										<Dropdown
											placeholder="Change semester"
											inline
											options={options}
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
						<Button color="teal" content="Generate Course Report" />
					</Button.Group>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Sidebar;

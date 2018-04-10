import React, { Component } from 'react';
import { Segment, Header, Grid, Item } from 'semantic-ui-react';

const items = [
	{ key: 1, content: "Hello hello hello" },
	{ key: 2, content: "Hello hello hello" },
	{ key: 3, content: "Hello hello hello" },
	{ key: 4, content: "Hello hello hello" },
	{ key: 5, content: "Hello hello hello" },
	{ key: 6, content: "Hello hello hello" },
	{ key: 7, content: "Hello hello hello" },
	{ key: 8, content: "Hello hello hello" },
	{ key: 9, content: "Hello hello hello" },
	{ key: 10, content: "Hello hello hello" },
	{ key: 11, content: "Hello hello hello" },
	{ key: 12, content: "Hello hello hello" },
	{ key: 13, content: "Hello hello hello" },
	{ key: 14, content: "Hello hello hello" }
];

const inline = {
	width: "100rem",
	height: "25rem",
	"overflow-y": "auto"
}

class Sidebar extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row className="sidebar">
					<Segment fluid textAlign='right'>	
						<Header as='h3' content='1st Semester AY 2017-2018' subheader='Current Semester' />
					</Segment>
				</Grid.Row>
				<Grid.Row>
					<Segment style={inline}>
						<Item.Group divided>
							{
								items.map((item, index) => 
									<Item key={index}>
										<Item.Content verticalAlign="middle" textAlign="left">
											{item.content}
										</Item.Content>
									</Item>
								)
							}
						</Item.Group>
					</Segment>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Sidebar;

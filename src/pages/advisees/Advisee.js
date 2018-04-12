import React, { Component } from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';
import AdviseeTable from './AdviseeTable';
import AddAdvisee from './AddAdvisee';

class Advisee extends Component {
	render() {
		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column width={2} />
						<Grid.Column width={9}>
							<Input placeholder='Search advisee here' icon='search' fluid />
						</Grid.Column>
						<Grid.Column width={1} />
						<Grid.Column width={3}>
							<AddAdvisee />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<AdviseeTable />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}

export default Advisee;

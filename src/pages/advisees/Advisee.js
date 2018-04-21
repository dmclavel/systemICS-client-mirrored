import React, { Component } from 'react';
import { Grid, Input, Button, Segment } from 'semantic-ui-react';
import AdviseeTable from './AdviseeTable';
import autobind from 'react-autobind';
class Advisee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: ''
		};
		autobind(this);
	}
	handleSearch(e) {
		this.setState({ searchInput: e.target.value });
	}
	render() {
		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<Segment>
								<Input
									placeholder="Search advisee"
									icon="search"
									iconPosition="left"
									fluid="true"
									transparent
									onChange={this.handleSearch}
								/>
							</Segment>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<AdviseeTable search={this.state.searchInput} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default Advisee;

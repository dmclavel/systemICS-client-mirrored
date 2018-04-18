import React, { Component } from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';
import AdviseeTable from './AdviseeTable';
import AddAdvisee from './AddAdvisee';
import autobind from 'react-autobind';
class Advisee extends Component {
	constructor(props){
		super(props);
		this.state={
			searchInput: ''
		}
		autobind(this);
	}
	handleSearch(e){
		this.setState({searchInput: e.target.value});
	}
	render() {
		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<Input placeholder='Search advisee here' icon='search' onChange={this.handleSearch} fluid />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<AdviseeTable search={this.state.searchInput} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}

export default Advisee;

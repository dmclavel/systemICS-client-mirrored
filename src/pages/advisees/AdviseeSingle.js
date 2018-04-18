import React, { Component } from 'react';
import { Table, Button, Dropdown, Grid, Icon } from 'semantic-ui-react';
import autobind from 'react-autobind';

class AdviseeSingle extends Component {
	constructor (props){
		super(props);
		autobind(this);
	}
	handleAssignOnClick(e) {
		console.log("ASSIGN!");
		console.log(this.props.advisee);
	}
	render() {
		return (
			<Table celled structured >
				<Table.Row >
					<Table.Cell width={4} rowspan={this.props.advisee.advisers.length+1}>{this.props.advisee.name}</Table.Cell>
					{
						this.props.advisee.advisers[0].status==='pending'?
							<Table.Cell width={12} warning>
							<Grid>
								<Grid.Column width={5}>
								{this.props.advisee.advisers[0].adviser_name}
								</Grid.Column>
								<Grid.Column width={4}>
								<Button icon color="yellow" size="mini" >
									<Icon name='check circle' />
									Confirm
								</Button>
								</Grid.Column>
							</Grid>
							</Table.Cell>
							:
							this.props.advisee.advisers[0].status==='previous'?
							<Table.Cell width={12} negative>{this.props.advisee.advisers[0].adviser_name}</Table.Cell>
							: 
							<Table.Cell width={12}>{this.props.advisee.advisers[0].adviser_name}</Table.Cell>
					}
				</Table.Row>
				{
					this.props.advisee.advisers.map((adviser,index)=>
						index === 0? null: 
						<Table.Row >
						{
							adviser.status==='pending'?
							<Table.Cell warning>
							<Grid>
								<Grid.Column width={5}>
									{adviser.adviser_name}
								</Grid.Column>
								<Grid.Column width={4}>
									<Button icon color="yellow" size="mini">
										<Icon name='check circle' />
										Confirm
									</Button>
								</Grid.Column>
							</Grid>
							</Table.Cell>
							:
							adviser.status==='previous'?
							<Table.Cell width={12} negative>{adviser.adviser_name}</Table.Cell>
							: 
							<Table.Cell width={12}>{adviser.adviser_name}</Table.Cell>
						}

						</Table.Row>
					)

				}
				<Table.Row>
					<Table.Cell width ={12}> 
					<Grid>
					<Grid.Column width={13}>
						<Dropdown
		                  placeholder="Select adviser"
		                  fluid
		                  search
		                  selection
		                  options={this.props.list_advisers}
		                />
		             </Grid.Column>
					<Grid.Column width={2}>
		                <Button color="green" onClick={this.handleAssignOnClick}>
			                Assign
		                </Button>
		            </Grid.Column>
	                </Grid>
					</Table.Cell>

					</Table.Row>

			</Table>
		)
	}
}

export default AdviseeSingle;

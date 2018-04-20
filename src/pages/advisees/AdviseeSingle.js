import React, { Component } from 'react';
import { Table, Button, Dropdown, Grid, Icon, Segment } from 'semantic-ui-react';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
class AdviseeSingle extends Component {
	constructor (props){
		super(props);
		autobind(this);
		this.state = {
			endpoint: 'https://sleepy-falls-95372.herokuapp.com',
			list_advisers: [],
			selected_adviser: undefined,
			current_adviser: null,
			hasPending:false
		}
	}
	handleAssignOnClick(e) {
		const socket = socketIOClient(this.state.endpoint);
		socket.emit('create_advisee_adviser',{emp_no: this.state.selected_adviser, student_number: this.props.advisee.key});
		this.setState({hasPending:true});
	}
	handleRemoveOnClick(e) {
		const socket = socketIOClient(this.state.endpoint);
		socket.emit('remove_advisee_advisers', {student_number:this.props.advisee.key,emp_no:e.target.value});
		this.setState({hasPending:false});
		
	}
	handleConfirmOnClick(e) {
		const socket = socketIOClient(this.state.endpoint);
		if (this.props.advisee.advisers.length>0 && this.props.advisee.advisers[0].status == "Current"){
			socket.emit('modify_advisee_advisers', {new_current:e.target.value, old_current:this.props.advisee.advisers[0].adviser_advisee_id});
		}else{
			socket.emit('modify_advisee_advisers', {new_current:e.target.value});

		}
		this.setState({hasPending:false});
	}
	handleSelected(e,data){
		this.setState({selected_adviser:data.value});
	}
	componentDidMount(){
		const socket = socketIOClient(this.state.endpoint);
		if(this.props.advisee.advisers[1] != null && this.props.advisee.advisers[1].status === "Pending"){
			this.setState({hasPending:true});
		}

		socket.on('update_alert', update => {
		    socket.emit('view_faculty',{active: true});
	    });

		socket.emit('view_faculty',{active:true});
		socket.on('view_faculty', advisers=>{
			let list_advisers = [];
			advisers.forEach((adviser)=>{
				list_advisers.push({
					key: adviser.emp_no,
					value: adviser.emp_no,
					text: adviser.name
				});
			});
			let list_adviser_filtered = [];
			list_advisers
			.filter(adviser_all => {
				if (adviser_all.key === this.props.advisee.advisers[0].adviser_emp_no)
		            {
		              return false;
		            }
	            return true;
             }).map((adviser)=>{
             		list_adviser_filtered.push({
             		key: adviser.key,
					value: adviser.value,
					text: adviser.text
             	});
             });
			this.setState({list_advisers: list_adviser_filtered});
		});
	}
	render() {
		return (
			<Table celled structured >
				<Table.Row >
					<Table.Cell width={4} rowspan={this.props.advisee.advisers.length+1}>{this.props.advisee.name}</Table.Cell>
					{
						this.props.advisee.advisers[0].status==='Pending'?
							<Table.Cell width={12} warning>
							<Grid>
								<Grid.Column width={13}>
								{this.props.advisee.advisers[0].adviser_name}
								</Grid.Column>
								<Grid.Column width={1}>
								<Button icon color="blue" value={this.props.advisee.advisers[0].adviser_advisee_id} size="mini" onClick={this.handleConfirmOnClick}>
									<Icon name='checkmark circle' />
								</Button>
								</Grid.Column>
								<Grid.Column width={1}>
								<Button icon color="red" size="mini" value={this.props.advisee.advisers[0].adviser_emp_no} onClick={this.handleRemoveOnClick}>
									<Icon name='remove' />
								</Button>
								</Grid.Column>
							</Grid>
							</Table.Cell>
							:
							this.props.advisee.advisers[0].status==='Previous'?
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
							adviser.status==='Pending'?
							<Table.Cell warning>
							<Grid>
								<Grid.Column width={13}>
									{adviser.adviser_name}
								</Grid.Column>
								<Grid.Column width={1}>
									<Button icon color="blue" value={adviser.adviser_advisee_id} size="mini" onClick={this.handleConfirmOnClick}>
										<Icon name='checkmark circle' />
									</Button>
								</Grid.Column>
								<Grid.Column width={1}>
								<Button icon color="red" value={adviser.adviser_emp_no} size="mini" onClick={this.handleRemoveOnClick}>
									<Icon name='remove' />
								</Button>
								</Grid.Column>
							</Grid>
							</Table.Cell>
							:
							adviser.status==='Previous'?
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
			                  value={this.state.selected_adviser}
			                  onChange={this.handleSelected}
			                  fluid
			                  disabled={this.state.hasPending?true:false}
			                  search
			                  selection
			                  error={this.state.hasPending?true:false}
			                  options={this.state.list_advisers}
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

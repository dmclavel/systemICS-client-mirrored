import React, { Component } from 'react';
import { Table, Dropdown, Button, Grid, Icon } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
const x = [
	{ key: 1, advisee: 'Aaron Louie Lagazon', advisers: [
			{
				adviser_name: 'Reginald Recario', 
				status: 'Previous'
			},
			{
				adviser_name: 'Miyah Queliste', 
				status: 'Current'
			},
			{
				adviser_name: 'Jason Obrero', 
				status: 'Pending'
			}
		]
	},
	{ key: 2, advisee: 'Kobe Jee De Luna', advisers: [
			{
				adviser_name: 'Bernadette Pelaez', 
				status: 'Current'
			},
			{
				adviser_name: 'Patric Albacea', 
				status: 'Previous'
			},
			{
				adviser_name: 'Jason Obrero', 
				status: 'Pending'
			}
		]
	}
]
const advisers = [
	{
		key: 1,
		value: "Reginald Recario",
		text: "Reginald Recario"
	},
	{
		key: 2,
		value: "Rick Jason Obrero",
		text: "Rick Jason Obrero"
	},
	{
		key: 3,
		value: "Miyah Queliste",
		text: "Miyah Queliste"
	},
	{
		key: 4,
		value: "Bernadette Pelaez",
		text: "Bernadette Pelaez"
	},
	{
		key: 5,
		value: "Patric Albacea",
		text: "Patric Albacea"
	}
]
class AdviseeTable extends Component {
	constructor(props){
		super(props);
		this.state={
	      endpoint: 'https://sleepy-falls-95372.herokuapp.com',
	      list_advisers: []

		}
	}
componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('search_adviser_advisee_information_by_id',{emp_no: 1});
	socket.on('search_adviser_advisee_information_by_id', advisee=>{
		console.log(advisee);
	});

	socket.emit('view_all_adviser',{});
	socket.on('view_all_adviser', advisers=>{
		advisers.forEach((adviser)=>{
	        let l_advisee = [];
			socket.emit('search_adviser_advisee_information_by_id',{emp_no: adviser.emp_no});

        	socket.on('search_adviser_advisee_information_by_id', advisee=>{
        		advisee.forEach((advisee)=>{
        			l_advisee.push(advisee.student_name);

        		});

        	});
        	this.state.list_advisers.push({
        		adviser: adviser.faculty_name,
        		advisee: l_advisee

        	});


		});
		this.setState({advisers})
		// console.log(advisers);
	});
}

	render() {
		return (
			<div>
				{
					x
					.filter(information => {
                    if (
                      information.advisee
                        .toLowerCase()
                        .includes(this.props.search.toLowerCase())
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((advisee) =>
						<Table celled structured >
							<Table.Row >
								<Table.Cell width={4} rowspan={advisee.advisers.length+1}>{advisee.advisee}</Table.Cell>
								{
									advisee.advisers[0].status==='Pending'?
										<Table.Cell width={12} warning>
										<Grid>
											<Grid.Column width={5}>
											{advisee.advisers[0].adviser_name}
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
									
										advisee.advisers[0].status==='Previous'?
										<Table.Cell width={12} negative>{advisee.advisers[0].adviser_name}</Table.Cell>
										: 
										<Table.Cell width={12}>{advisee.advisers[0].adviser_name}</Table.Cell>
								}
							</Table.Row>
							{
								advisee.advisers.map((adviser,index)=>
									index === 0? null: 
									<Table.Row >
									{
										adviser.status==='Pending'?
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
					                  fluid
					                  search
					                  selection
					                  options={advisers}
					                />
					             </Grid.Column>
								<Grid.Column width={2}>
					                <Button color="green">
						                Assign
					                </Button>
					            </Grid.Column>
				                </Grid>
								</Table.Cell>

								</Table.Row>

						</Table>
					)	
				}		
			</div>
		)	
	}
}

export default AdviseeTable;

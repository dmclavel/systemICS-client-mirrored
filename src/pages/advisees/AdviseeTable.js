import React, { Component } from 'react';
import { Table, Dropdown, Button, Grid, Icon } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import AdviseeSingle from './AdviseeSingle'
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
	      advisees: []

		}
	}
componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_advisee_advisers',{enrolledOnly: true});
    let advisees_list = [];
	socket.on('view_advisee_advisers', advisees=>{
		advisees.forEach((advisee)=>{
			console.log(advisee.name);
			advisees_list.push({
				key:advisee.student_number,
				name: advisee.name,
				advisers: advisee.advisers
			})
		});
		this.setState({advisees:advisees_list});
		console.log(x);
		console.log(this.state.advisees);

	});	

}

	render() {
		return (
			<div>
				{
					this.state.advisees
					.filter(information => {
                    if (
                      information.name
                        .toLowerCase()
                        .includes(this.props.search.toLowerCase())
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((advisee_single) =>
						<AdviseeSingle advisee={advisee_single} list_advisers={advisers}/>
					)	
				}		
			</div>
		)	
	}
}

export default AdviseeTable;

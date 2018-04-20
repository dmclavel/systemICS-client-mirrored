import React, { Component } from 'react';
import { Table, Dropdown, Button, Grid, Icon } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import AdviseeSingle from './AdviseeSingle';
import autobind from 'react-autobind';
const x = [
	{ key: 1, name: 'Aaron Louie Lagazon', advisers: [
			{
				adviser_name: 'Reginald Recario', 
				status: 'previous'
			},
			{
				adviser_name: 'Miyah Queliste', 
				status: 'pending'
			},
			{
				adviser_name: 'Jason Obrero', 
				status: 'current'
			}
		]
	},
	{ key: 2, name: 'Kobe Jee De Luna', advisers: [
			{
				adviser_name: 'Bernadette Pelaez', 
				status: 'current'
			},
			{
				adviser_name: 'Patric Albacea', 
				status: 'previous'
			},
			{
				adviser_name: 'Jason Obrero', 
				status: 'pending'
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
		autobind(this);
	}
componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);

    socket.on('update_alert', update => {
    	console.log('t');
	    socket.emit('view_advisee_advisers',{enrolledOnly: true});
    });

    socket.emit('view_advisee_advisers',{enrolledOnly: true});
	socket.on('view_advisee_advisers', advisees=>{
		console.log(advisees);
	    let advisees_list = [];
		advisees.forEach((advisee)=>{
			advisees_list.push({
				key:advisee.student_number,
				adviser_advisee_id: advisee.adviser_advisee_id,
				name: advisee.name,
				advisers: advisee.advisers
			})
		});
		this.setState({advisees:advisees_list});

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
						<AdviseeSingle advisee={advisee_single} />
					)	
				}		
			</div>
		)	
	}
}

export default AdviseeTable;

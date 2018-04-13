import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import SearchCard from '../../../components/SearchCard';
import UsersTable from '../../../components/UsersTable';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

const users = [
  { name: 'John', email: 'jhon@up.edu.ph', status: 'student', id: '2015-12345' },
  { name: 'Amber', email: 'amber@up.edu.ph', status: 'faculty', id: '12317890' },
  { name: 'Leslie', email: 'leslie@up.edu.ph', status: 'student', id: '20014-32343' },
  { name: 'Ben', email: 'ben@up.edu.ph', status: 'faculty', id: '12379834' },
]
class User extends Component {
	constructor(props){
		super(props);
		this.state={
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			data: users,
			visibleData: users
		}
		autobind(this);
	}
	componentDidMount = () =>{
		// fetch all users
		// const socket = socketIOClient(this.state.address);
		// socket.emit('');
	}
	handleSearch = (query) => {
		if(query.length == 0){
			this.setState({visibleData: this.state.data})
		}else{
			this.setState(
				{
					visibleData: this.state.data.filter( (user) =>{
						if( user.name.toLowerCase().includes(query.toLowerCase()) ){
							return true;
						}else{
							return false;
						}
					}
					)
				}
			);
		}
		console.log(this.state.visibleData);
	}
	render() {
		return (
			<Grid>
				<Grid.Row>
					<SearchCard fluid={true} handleSearch={this.handleSearch}/>
				</Grid.Row>
				<Grid.Row>
					<UsersTable data={this.state.visibleData}/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default User;

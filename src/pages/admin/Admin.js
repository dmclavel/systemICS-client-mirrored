import React, { Component } from 'react';
import { Grid, Container, Header, Table, Button, Card, Input, Modal, Segment} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import NavbarIn from '../components/navbar/NavbarIn';
import ManageHeader from '../components/headers/ManageHeader';
import Sidebar from '../components/Sidebar';
import AdminCard from './AdminCard.js';
import autobind from 'react-autobind';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};

class Admin extends Component {
  render() {
    return(
      <div className='Admin'>
      	<Grid>
      		<Grid.Row>
      			<NavbarIn user={this.props.user} active='manage' />
      			<ManageHeader user={this.props.user} />
      		</Grid.Row>
      		<Grid.Row>
      			<Grid.Column width={1} />
      			<Grid.Column width={4}>
      				<Sidebar />
      			</Grid.Column>
      			<Grid.Column width={10}>
      				<AdminCard/>
      			</Grid.Column>
      		</Grid.Row>
			</Grid>
      </div>
    );
  }
}

export default Admin;

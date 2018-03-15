
import React, { Component } from 'react';
import { Grid, Container, Header, Table } from 'semantic-ui-react';
import './Admin.css';
import Data from './Data.js';

import LoggedInNavBar from '../../components/LoggedInNavBar';

class Admin extends Component {
  render() {
    return(
      <div className='Admin'>
      	<LoggedInNavBar />
			 <Grid centered={true}>
      	 <Grid.Row>  </Grid.Row>
      	 
      	 
      	 <Grid.Row>
						 <Header>
						 	<div class="ui left aligned container">
						 		 <div class="ui huge left header" id='header' >Faculty Workload</div>
						 	</div>
						</Header>
				</Grid.Row>
				
				<Grid.Row> 
						<div class="ui huge center header">
						 		1st Semester A.Y. 2017-2018
						 	</div>
				</Grid.Row>
				
				<Grid.Row>  
					<Data/>
				</Grid.Row>
			</Grid>
			
      </div>
    );
  }
}

export default Admin;

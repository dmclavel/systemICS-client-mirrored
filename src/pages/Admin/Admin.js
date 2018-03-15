
import React, { Component } from 'react';
import { Grid, Container, Header, Table, Input} from 'semantic-ui-react';
import './Admin.css';
import Data from './Data.js';
import RegCom from './RegCom.js';
class Admin extends Component {
  render() {
    return(
      <div className='Admin'>
			 <Grid>
      	 <Grid.Row>  </Grid.Row>
      	 <Grid.Column width={10}>
      	 
      	 <Grid.Row >
						 <Header>
						 	<div class="ui left aligned container">
						 		 <div class="ui huge left aligned header" id='header' >Faculty Workload</div>
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
			
			</Grid.Column>
			
			<Grid.Column> </Grid.Column>
			
			<Grid.Column width={4}>
			<Container>	
				 <Header>
						 		 <div class="ui huge header" id='header' >Registration Committee</div>
					</Header>
					
					<Input placeholder="Search Reg Com" icon="search"/>
					<Grid.Row> 

						<RegCom name="Ariel Doria" email="abdoria@up.edu.ph" room="C-112"/>
						<RegCom name="Reginald Recario" email="rcrecario@up.edu.ph" room="C-114"/>
						<RegCom name="Ariel Doria" email="abdoria@up.edu.ph" room="C-112"/>
	
					</Grid.Row>
					
					 <Grid.Row> <br/> </Grid.Row>
					 
					<Grid.Row>
						<button class="green fluid bottom attached ui button" tabindex="0">
								  <i class="edit icon"></i> Add
								
					</button>
					</Grid.Row>
					</Container>
			</Grid.Column>
			
      </Grid>
      </div>
    );
  }
}

export default Admin;

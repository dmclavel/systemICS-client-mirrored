

import React, { Component } from 'react';
import { Grid, Header, Table,Segment } from 'semantic-ui-react';
import './Admin.css';
class RegCom extends Component {
  render() {
    return(
      <div className='RegCom'>
      <br/>
      <Segment id="segment">
      
							<div class="ui header">
							<i class="huge circular user icon"></i>
							</div>
							
							<div class="ui sub header" > {this.props.name} <br/> </div>
							{this.props.room} <br/>
							{this.props.email} <br/>
							
							
							
						
						
     </Segment>
     <Grid.Row>
						<button class="red fluid bottom attached ui button" tabindex="0">
								  <i class="close icon"></i> Remove
								
					</button>
					</Grid.Row>
      </div>
    );
  }
}

export default RegCom;

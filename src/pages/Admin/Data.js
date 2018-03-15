import React, { Component } from 'react';
import { Container, Header, Table, Button } from 'semantic-ui-react';
import './Admin.css';
class Data extends Component {
  render() {
    return(
			<Container>
      	<Table class="ui large compact celled definition table" id="table">
					<thead class="full-width">
						<tr>
							<th>Name</th>
							<th>Section</th>
							<th>Schedule</th>
							<th>Room</th>
							<th>Class Population</th>
							
						</tr>
					</thead>
					<tbody>
						<tr>
							
							<td>Ariel Doria</td>
							<td>CMSC 125 T-1L</td>
							<td>4:00PM-5:00PM</td>
							<td>PC Lab 6</td>
							<td>20</td>
						</tr>
						<tr>
							
							<td>Ariel Doria</td>
							<td>CMSC 125 T-1L</td>
							<td>4:00PM-5:00PM</td>
							<td>PC Lab 6</td>
							<td>20</td>
						</tr>
						
						<tr>
							
							<td>Ariel Doria</td>
							<td>CMSC 125 T-1L</td>
							<td>4:00PM-5:00PM</td>
							<td>PC Lab 6</td>
							<td>20</td>
						</tr>
						
						<tr>
							
							<td>Ariel Doria</td>
							<td>CMSC 125 T-1L</td>
							<td>4:00PM-5:00PM</td>
							<td>PC Lab 6</td>
							<td>20</td>
						</tr>
						
						<tr>
							
							<td>Ariel Doria</td>
							<td>CMSC 125 T-1L</td>
							<td>4:00PM-5:00PM</td>
							<td>PC Lab 6</td>
							<td>20</td>
						</tr>
						
						<tr>
							
							<td>Ariel Doria</td>
							<td>CMSC 125 T-1L</td>
							<td>4:00PM-5:00PM</td>
							<td>PC Lab 6</td>
							<td>20</td>
						</tr>
						
						<tr>
							
							<td>Ariel Doria</td>
							<td>CMSC 125 T-1L</td>
							<td>4:00PM-5:00PM</td>
							<td>PC Lab 6</td>
							<td>20</td>
						</tr>					</tbody>
					
				</Table>
					<button class="green fluid ui button">
								  <i class="edit icon"></i> Add 
								
					</button>
				<div class="ui right aligned header">
					<button class="ui negative button">
										<i class="file alternate icon"></i> Post
					 </button>
				</div>
			</Container>
    );
  }
}

export default Data;

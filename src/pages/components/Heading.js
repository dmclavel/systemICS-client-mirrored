import React, { Component } from 'react';
import { Container, Header, Image, Grid } from 'semantic-ui-react';
import './Heading.css';
import image from './GAZA.jpg';

class Heading extends Component {
	render() {
		return (
			<div className="heading-main">
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							<p className="heading-text">
								Ready to work, Ced?<br/>
							</p>
							<p class="subheading">You are working as the administrator</p> 
						</Grid.Column>
						<Grid.Column width={6}>
							<div className="options">
								<Grid divided>
									<Grid.Column width={5}>
										Hello
									</Grid.Column>
									<Grid.Column width={6}>
										hello
									</Grid.Column>
									<Grid.Column width={5}>
										hello
									</Grid.Column>
								</Grid>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>


			 	<Image src={image} circular={true} rounded={true} className="image"/>
			</div>
		);
	}
}

export default Heading;

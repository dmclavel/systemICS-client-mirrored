import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import image from './GAZA.jpg';
import './ManageHeader.css';

class ManageHeader extends Component {
	render() {
		return (
			<div className="manage-heading">
				<div className="heading-background" />
				<div className="heading-content">
					<Grid>
						<Grid.Row divided>
							<Grid.Column width={9}>
								<Image src={image} size='small' bordered circular={true} floated='left' rounded={true} />
								<p className="heading-message">
									Ready to work, Ced?<br/>
								</p>
								<p class="heading-submessage">You are working as the {this.props.user.localeCompare('admin') === 0 ? 'administrator' : 'registration committee.'}</p> 
							</Grid.Column>
							<Grid.Column width={2}>
								{ console.log(this.props) }
								{
									this.props.user.localeCompare('admin') === 0 ?
										<div>
											<Link to='courses'>
												<Button className='admin-button' circular icon='book huge' />
											</Link>
											<p className="admin-button-caption">Course Offering</p>
										</div>
									: null
								}
							</Grid.Column>
							<Grid.Column width={2}>
								<Link to='advisees'>
									<Button className='admin-button' circular icon='user plus huge' />
								</Link>
								<p className="admin-button-caption">Advisees</p>
							</Grid.Column>
							<Grid.Column width={2}>
								<Link to='teaching'>
									<Button className='admin-button' circular icon='clipboard huge' />
								</Link>
								<p className="admin-button-caption">Teaching Load</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default ManageHeader;

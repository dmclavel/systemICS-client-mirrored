import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ManageHeader.css';

class SectionHeader extends Component {
	render() {
		return (
			<div className="home-heading">
				<div className="home-background bg-color-header-home" />
				<div className="heading-content">
					<Grid>
						<Grid.Row divided>
							<Grid.Column width={9}>
								<p className="section-heading-message">
									{this.props.course_no} {this.props.section}<br/>
								</p>
								<p class="section-heading-submessage">
									{this.props.course_title}
								</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default SectionHeader;

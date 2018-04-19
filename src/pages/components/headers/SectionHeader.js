import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import './ManageHeader.css';

class SectionHeader extends Component {
	render() {
		return (
			<div className="home-heading">
				<div className="home-background bg-color-header-home" />
				<div className="heading-content font-white">
					<p className="section-name">CMSC 128</p>
					<p class="section-email">Introduction to Software Engineering</p>

					<Grid>
						<Grid.Row>
							<Grid.Column width={3} />
							<Grid.Column width={4}>
								<Header
									className="font-white"
									content="7:00AM-8:00AM"
									icon="clock"
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<Header
									className="font-white"
									content="Reginald Recario"
									icon="user outline"
								/>
							</Grid.Column>
							<Grid.Column width={4}>
								<Header
									className="font-white"
									content="ICSMH"
									icon="building"
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default SectionHeader;

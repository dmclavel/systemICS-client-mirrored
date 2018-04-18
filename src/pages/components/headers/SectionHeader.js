import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ManageHeader.css';

class SectionHeader extends Component {
	render() {
		return (
			<div className="home-heading">
				<div className="home-background bg-color-header-home" />
				<div className="heading-content font-white">
					<p className="db-name">
						{this.props.course_no} {this.props.section}<br/>
					</p>
					<p class="db-email">
						{this.props.course_title}
					</p>
				</div>
			</div>
		);
	}
}

export default SectionHeader;

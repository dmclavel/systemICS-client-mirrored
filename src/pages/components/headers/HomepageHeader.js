import React, { Component } from 'react';
import './ManageHeader.css';

class HomepageHeader extends Component {
	render() {
		return (
			<div className="home-heading">
				<div className="home-background bg-color-header-home" />
				<div className="heading-content font-white">
					<p className="section-name">SYSTEMICS</p>
					<p class="section-email">
						The official Registration System for the Institute of Computer
						Science
					</p>
				</div>
			</div>
		);
	}
}

export default HomepageHeader;

import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './ManageHeader.css';

class ClassesHeader extends Component {
	handleChange = e => {
		this.props.updateSearch(e.target.value);
	};

	render() {
		const value = this.props.search;
		return (
			<div className="home-heading">
				<div className="home-background bg-color-header-home" />
				<div className="heading-content font-white">
					<p className="section-name">{this.props.type.toUpperCase()}</p>
					<div className="center-content" width={16}>
						<Input
							fluid
							raised={true}
							width={16}
							value={value}
							icon="search"
							placeholder={`Search ${this.props.type}...`}
							onChange={this.handleChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ClassesHeader;

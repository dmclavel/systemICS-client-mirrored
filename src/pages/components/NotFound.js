import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

class NotFound extends Component {
	render() {
		return (
			<div className="vertical-center">
				<Header as='h1' size='huge'>
					Oh snap!
					<Header.Subheader>The page you're looking for doesn't seem to exist.</Header.Subheader>
				</Header>
			</div>
		);
	}
}

export default NotFound;

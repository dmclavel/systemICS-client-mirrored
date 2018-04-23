import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

class NotFound extends Component {
	render() {
		return (
			<div className="vertical-center">
				<Header
					as="h1"
					icon="warning sign"
					size="huge"
					content="Oh snap!"
					subheader={`The page you're looking for doesn't seem to exist.`}
				/>
			</div>
		);
	}
}

export default NotFound;

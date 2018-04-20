import React, { Component } from 'react';
import { Modal, Segment, Button, Divider, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import './DropFile.css';

const inlineStyle = {
	modal: {
		marginTop: '10vh !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'
	}
};

class DropFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: []
		};

		this.handleOnDrop = this.handleOnDrop.bind(this);
	}

	handleOnDrop = file => {
		let readerFile = new FileReader();
		readerFile.addEventListener('load', file => {
			console.log(file.target.result);
		});
		readerFile.readAsText(file[0]);
	};

	render() {
		const { files } = this.state;

		return (
			<Modal
				size="large"
				style={inlineStyle.modal}
				onClose={this.close}
				trigger={<Button content="Import File" color="blue" />}
				closeIcon
			>
				<Modal.Header>Drop Files Here</Modal.Header>
				<Modal.Content>
					<div>
						<Dropzone
							className="dropzone"
							onDrop={files =>
								files.length === 1 ? this.handleOnDrop(files) : null
							}
						>
							<div className="dropzone-text">
								<Header as="h1" content="Drop files here!" />
								<Divider horizontal>OR</Divider>

								<div>
									<Dropzone
										className="dropzone-button"
										onDrop={files =>
											files.length === 1 ? this.handleOnDrop(files) : null
										}
									>
										<p className="dropzone-button-text">Select files here</p>
									</Dropzone>
								</div>
							</div>
						</Dropzone>
					</div>

					<Button content="STUDENT" />
					<Button content="ADMIN" />
					<Button content="COURSE OFFERING" />
					<Button content="COURSE" />
					<Button content="FACULTY" />
					<Button content="ADVISER-ADVISEE" />
					<Button content="SENIOR-JUNIOR" />
				</Modal.Content>
			</Modal>
		);
	}
}

export default DropFile;

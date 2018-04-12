import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown } from 'semantic-ui-react';

const inline = {
	marginTop : '100px',
	marginLeft : 'auto',
	marginRight : 'auto'
}

const options = [
	{ key: 1, value: 'recario', text: 'Reginald Recario' },
	{ key: 2, value: 'pelaez', text: 'Bernadette Pelaez' },
	{ key: 3, value: 'tan', text: 'Katherine Tan' },
	{ key: 4, value: 'clarino', text: 'Maan Clarino' },
	{ key: 5, value: 'lactuan', text: 'Lei Lactuan' }
]

class AddAdvisee extends Component {
	render() {
		return (
			<Modal trigger={<Button fluid content="Add Advisee" />} style={inline}>
				<Modal.Header content="Add Advisee" />
				<Modal.Content>
					<Form>
						<Form.Group>
							<Form.Input width={4} label='Student Number' placeholder='Student Number' />
							<Form.Input width={5} label='Last Name' placeholder='Last Name' />
							<Form.Input width={5} label='First Name' placeholder='First Name' />
							<Form.Input width={2} label='Middle Initial' placeholder='MI' />
						</Form.Group>
						<Form.Group>
							<Form.Input width={10} label='E-mail Address' placeholder='E-mail Address' />
							<Form.Input width={6} label='Curriculum' placeholder='Curriculum' />
						</Form.Group>
						<Form.Dropdown label='Adviser' placeholder='State' fluid search selection options={options} />
						<Button centered content="Submit" positive />
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default AddAdvisee;

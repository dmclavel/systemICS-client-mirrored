import React, { Component } from 'react';
import { Table, Grid, Button, Popup, Icon, Modal } from 'semantic-ui-react';
import autobind from 'react-autobind';


const ModalExampleShorthand = () => (
  <Modal
    trigger={<Button>Show Modal</Button>}
    header='Reminder!'
    content='Call Benjamin regarding the reports.'
    actions={[
      'Snooze',
      { key: 'done', content: 'Done', positive: true },
    ]}
  />
)


class StudentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
      visibleData: this.props.data
    };
    autobind(this);
  }

  render() {
    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell width={5}>Student Number</Table.HeaderCell>
            <Table.HeaderCell width={5}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={5}> Curriculum </Table.HeaderCell>
            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
            <Table.HeaderCell width={4}>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.data.map(user => {
            return (
              <Table.Row>
                <Table.Cell>{user.student_number}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell textAlign="center">{user.email_add}</Table.Cell>
                 <Table.Cell textAlign="center">{user.curriculum}</Table.Cell>
                <Table.Cell> {user.status} </Table.Cell>
                <Table.Cell> 
                     <Grid>
                    <Grid.Row centered columns={3}>
                      <Grid.Column>
                        <Popup
                          trigger={<Button icon="x" negative onClick={()=>{ModalExampleShorthand}}/>}
                          content="Delete"
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Popup
                          trigger={<Button icon="pencil" positive />}
                          content="Edit"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default StudentTable;

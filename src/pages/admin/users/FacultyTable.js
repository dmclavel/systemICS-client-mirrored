import React, { Component } from 'react';
import { Table, Grid, Button, Popup, Icon } from 'semantic-ui-react';
import autobind from 'react-autobind';
import './Table.css'
import EditFaculty from './EditFaculty';
import FacultyDelete from './FacultyDelete';
import config from '../../config.json'
class FacultyTable extends Component {
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
            <Table.HeaderCell width={2}>Emp. No.</Table.HeaderCell>
            <Table.HeaderCell width={3}>Name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Email</Table.HeaderCell>
            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
            <Table.HeaderCell width={2}>Access Level</Table.HeaderCell>
            <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.data.map(user => {
            return (
              <Table.Row>
                <Table.Cell textAlign="center">{user.emp_no}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell textAlign="center">{user.email_add}</Table.Cell>
                <Table.Cell textAlign="center">{user.status}</Table.Cell>
                <Table.Cell textAlign="center">
                  {user.isRegCom == 1 ? 'Faculty' : user.isRegCom == 2? 'Registration Committee' : 'Admin'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Grid>
                    <Grid.Row centered columns={2}>
                      <Grid.Column>
                        <FacultyDelete name={user.name} emp_no={user.emp_no} email_add={user.email_add} isRegCom={user.isRegCom} status={user.status} fetchData={this.props.fetchData}/>
                      </Grid.Column>
                      <Grid.Column>
                        <EditFaculty name={user.name} emp_no={user.emp_no} email_add={user.email_add} isRegCom={user.isRegCom} status={user.status} fetchData={this.props.fetchData}/>
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

export default FacultyTable;

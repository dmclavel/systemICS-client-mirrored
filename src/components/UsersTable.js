import React, { Component } from 'react';
import {Table, Grid, Button, Icon} from 'semantic-ui-react';
import autobind from 'react-autobind';



class UsersTable extends Component {
  constructor(props){
    super(props);
    this.state = {
     column: null,
     data: [],
     direction: null,
     visibleData: this.props.data
   }
    autobind(this);
  }

  render() {
    return(
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              ID
            </Table.HeaderCell>
            <Table.HeaderCell>
              Email
            </Table.HeaderCell>
            <Table.HeaderCell>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell>
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.props.data.map( (user) =>{
              return (
                <Table.Row>
                  <Table.Cell>
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>
                    {user.id}
                  </Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    {user.status}
                  </Table.Cell>
                  <Table.Cell>
                    <Button color='yellow'>
                      <Icon name='pencil'> </Icon>
                    </Button>
                    <Button color='red'>
                      <Icon name='trash'> </Icon>
                    </Button>
                  </Table.Cell>
                </Table.Row>);
            })
          }
        </Table.Body>

      </Table>
    );
  }
}

export default UsersTable;

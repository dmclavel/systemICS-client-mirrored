import React, { Component } from 'react';
import { Table, Grid, Button, Popup, Icon } from 'semantic-ui-react';
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

  //handle table sorting
  // handleSort = clickedColumn => () => {
  //  const { column, data, direction } = this.state
  //  if (column !== clickedColumn) {
  //    this.setState({
  //      column: clickedColumn,
  //      data: _.sortBy(data, [clickedColumn]),
  //      direction: 'ascending',
  //    })
  //    return
  //  }
  //
  //  this.setState({
  //    data: data.reverse(),
  //    direction: direction === 'ascending' ? 'descending' : 'ascending',
  //  })
  // }

  render() {
    return(
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell width={5}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell width={5}>
              Email
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell width={4}>
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
                    {user.email}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {user.status}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Grid>
                      <Grid.Row centered columns={3}>
                        <Grid.Column>
                          <Popup
                            trigger={
                              <Button positive>
                                <Icon.Group>
                                  <Icon name="user" />
                                  <Icon corner inverted name="arrow circle outline up" />
                                </Icon.Group>
                              </Button>
                            }
                            content='Promote user'
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Popup
                            trigger={<Button icon='add' negative />}
                            content='Archive user'
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
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

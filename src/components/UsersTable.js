import React, { Component } from 'react';
import {Table, Grid} from 'semantic-ui-react';
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
          <Table.Row>
            <Table.HeaderCell>
              Name
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
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    {user.status}
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

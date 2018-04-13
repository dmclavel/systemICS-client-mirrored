import React, { Component } from 'react';
import {Table, Grid} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import UsersTable from '../components/UsersTable';
import autobind from 'react-autobind';

class User extends Component {
  render() {
    return(
      <Grid>
        <Grid.Row>
          add new users here
        </Grid.Row>
        <Grid.Row>
          <UsersTable/>
        </Grid.Row>
      </Grid>
    );
  }
}

export default User;

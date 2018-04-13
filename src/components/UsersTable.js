import React, { Component } from 'react';
import {Table, Grid} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import autobind from 'react-autobind';


class User extends Component {
  constructor(){
    super(props);
    this.state = {

    }
    autobind(this);
  }
  render() {
    return(
      <Grid>
        <Grid.Row>
          add new users here
        </Grid.Row>
        <Grid.Row>

        </Grid.Row>
      </Grid>
    );
  }
}

export default User;

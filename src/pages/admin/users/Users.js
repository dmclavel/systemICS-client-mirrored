import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import NavbarIn from '../../components/navbar/NavbarIn';
import Sidebar from '../../components/Sidebar';
import ManageHeader from '../../components/headers/ManageHeader';
import User from './User';

class RegCom extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <NavbarIn
              logOutHandler={() => this.props.logOutHandler}
              user={this.props.user}
              active="manage"
            />
            <ManageHeader user={this.props.user} />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={10}>
              <User />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default RegCom;

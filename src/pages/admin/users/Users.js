import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

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
            <ManageHeader
              user={this.props.user}
              accessLvl={this.props.accessLvl}
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
              <Sidebar accessLvl={this.props.accessLvl} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Grid className="admin-container">
                <Grid.Row>
                  <Header as="h1" textAlign="left">
                    Users
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  <User />
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default RegCom;

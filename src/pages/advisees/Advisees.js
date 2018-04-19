import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import NavbarIn from '../components/navbar/NavbarIn';
import ManageHeader from '../components/headers/ManageHeader';
import Sidebar from '../components/Sidebar';
import Advisee from './Advisee';

class Advisees extends Component {
      render() {
            return (
                  <div className="Advisees">
                        <Grid>
                              <Grid.Row>
                                    <NavbarIn
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
                                          <Sidebar />
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                          <Grid.Row>
                                                <Header
                                                      as="h1"
                                                      textAlign="left"
                                                >
                                                      Course Offering
                                                </Header>
                                          </Grid.Row>
                                          <Grid.Row>
                                                <Advisee />
                                          </Grid.Row>
                                    </Grid.Column>
                              </Grid.Row>
                        </Grid>
                  </div>
            );
      }
}

export default Advisees;

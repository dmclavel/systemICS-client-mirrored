import React, { Component } from 'react';
import { Grid, Input, Segment, Header } from 'semantic-ui-react';
import Information from './Information';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';

import NavbarIn from '../components/navbar/NavbarIn';
import Sidebar from '../components/Sidebar';
import ManageHeader from '../components/headers/ManageHeader';

class RegCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informations: [],
      searchInput: '',
      endpoint: 'https://sleepy-falls-95372.herokuapp.com'
    };
    autobind(this);
  }
  handleSearch(e) {
    this.setState({ searchInput: e.target.value });
  }
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_all_active_faculty_members', {});
    socket.on('view_all_active_faculty_members', informations => {
      this.setState({
        informations
      });
    });
  }
  render() {
    const { informations, searchInput } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <NavbarIn user={this.props.user} active="manage" />
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
                <Header as="h1" textAlign="left">
                  Course Offering
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Segment>
                  <Input
                    placeholder="Search faculty"
                    icon="search"
                    iconPosition="left"
                    fluid="true"
                    transparent
                    onChange={this.handleSearch}
                  />
                </Segment>
              </Grid.Row>
              <Grid.Row>
                {informations
                  .filter(information => {
                    if (
                      information.name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((information, index) => {
                    return (
                      <Grid.Column width={11} stretched={true} key={index}>
                        <Information data={information} />
                      </Grid.Column>
                    );
                  })}
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default RegCom;

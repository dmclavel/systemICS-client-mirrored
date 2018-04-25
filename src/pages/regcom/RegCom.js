import React, { Component } from 'react';
import { Grid, Input, Segment, Header, Loader } from 'semantic-ui-react';
import Information from './Information';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';

import NavbarIn from '../components/navbar/NavbarIn';
import Sidebar from '../components/Sidebar';
import ManageHeader from '../components/headers/ManageHeader';
import config from './../../config.json';

class RegCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informations: [],
      searchInput: '',
      endpoint: config.backendAddress,
      loading: true
    };
    autobind(this);
  }
  handleSearch(e) {
    this.setState({ searchInput: e.target.value });
  }
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_faculty', { active: true });
    socket.on('view_faculty', informations => {
      this.setState({
        informations,
        loading: false
      });
    });
  }
  render() {
    const { informations, searchInput, loading } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <NavbarIn
              user={this.props.user}
              accessLvl={this.props.accessLvl}
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
              <Sidebar accessLvl={this.props.accessLvl}/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Grid.Row>
                <Header as="h1" textAlign="left">
                  Teaching Load
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
                <Loader active={loading} content="Loading faculty ..." />
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

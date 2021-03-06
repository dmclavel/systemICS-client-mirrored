import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import NavbarIn from '../components/navbar/NavbarIn';
import ManageHeader from '../components/headers/ManageHeader';
import Sidebar from '../components/Sidebar';
import AdminCard from './AdminCard.js';
import config from './../../config.json';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: config.backendAddress,
      acad_year: 0,
      semester: 0
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_timeframe', null);
    socket.on('view_timeframe', timeframe => {
      this.setState({
        acad_year: timeframe[timeframe.length - 1].acad_year,
        semester: timeframe[timeframe.length - 1].semester
      });
    });
  }

  handleChangeSemester = (acad_year, semester) => {
    this.setState({ acad_year: acad_year, semester: semester });
  };

  render() {
    const { acad_year, semester } = this.state;
    return (
      <div className="Admin">
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
              <Sidebar
                showSemester={true}
                current_year={acad_year}
                current_sem={semester}
                accessLvl={this.props.accessLvl}
                handleChangeSemester={this.handleChangeSemester}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <AdminCard current_year={acad_year} current_sem={semester} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Admin;

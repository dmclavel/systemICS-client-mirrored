import React, { Component } from 'react';
import {
  Grid,
  Container,
  Header,
  Input,
  Segment,
  Dropdown
} from 'semantic-ui-react';
import Information from './Information';
// import LoggedInNavBar from '../../components/LoggedInNavBar';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';

import NavbarIn from '../components/NavbarIn';
import Heading from '../components/Heading';
import Sidebar from '../components/Sidebar';

const informations = [
      {
        name: 'Ariel Doria',
        room: 'C-114',
        numStudents: 200,
        teachingLoad: 20
      },
      {
        name: 'Gerald Benedict Emalada',
        room: 'C-111',
        numStudents: 175,
        teachingLoad: 21
      },
      {
        name: 'Lei Kristoffer Lactuan',
        room: 'C-114',
        numStudents: 75,
        teachingLoad: 18
      },
      {
        name: 'Gerald Benedict Emalada',
        room: 'C-111',
        numStudents: 175,
        teachingLoad: 21
      },
      {
        name: 'Gerald Benedict Emalada',
        room: 'C-111',
        numStudents: 175,
        teachingLoad: 21
      },
      {
        name: 'Gerald Benedict Emalada',
        room: 'C-111',
        numStudents: 175,
        teachingLoad: 21
      },
      {
        name: 'Gerald Benedict Emalada',
        room: 'C-111',
        numStudents: 175,
        teachingLoad: 21
      },
      {
        name: 'Gerald Benedict Emalada',
        room: 'C-111',
        numStudents: 175,
        teachingLoad: 21
      }
    ];

class RegCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informations: [],
      endpoint: 'http://10.0.5.153:3000'
    };
    autobind(this);
  }
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('search_all_regcom', 'hehe');
    socket.on('search_all_regcom', informations => {
      this.setState({
        informations: informations
      });
    });
  }
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <NavbarIn />
            <Heading />
          </Grid.Row>

          <Grid.Row>  
            <Grid.Column width={1} />
            <Grid.Column width={4}>
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <Input
                  placeholder="Search faculty"
                  icon="search"
                  iconPosition="left"
                  transparent
                />
              </Segment>
              {informations.map(info => {
                return (
                  <Grid.Column width={11} stretched={true}>
                    <Information object={info} />
                  </Grid.Column>
                );
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default RegCom;

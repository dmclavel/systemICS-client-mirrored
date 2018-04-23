/*
AUTHOR: Gotis, Ciara Mae
FILE: FacultyTab, to be used for basic JS pages in the system.

BASIC TEMPLATE FOR ALL JS PAGES
DO NOT FORGET TO DOCUMENT YOUR OWN CODE.
Change name FacultyTab to the name of file.
This will be updated for mapping, grid layouting, etc.
Write the Author of the code at the top of the document.
*/
import { Card, Input, Grid, Container, Loader } from 'semantic-ui-react';
import React, { Component } from 'react';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
import './FacultyTab.css';
import FacultyCard from './FacultyCard';
import RegComCard from './RegComCard';
import NavbarHome from '../components/navbar/NavbarHome';
import ClassesHeader from '../components/headers/ClassesHeader';
import config from '../../config.json';

/*
If you wish to import other JS files, do it here.
*/

class FacultyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: config.backendAddress, // the address of the server
      faculty: [],
      search: '',
      loading: true
    };
    autobind(this);
  }

  // what to do once the page (re)loads
  componentDidMount = () => {
    this.setState({ loading: true });
    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.emit('view_faculty', 'dfesperanza@up.edu.ph'); //send data to 'login' endpoint in server
    socket.on('view_faculty', returnValueFromServer => {
      this.setState({ faculty: returnValueFromServer });
      this.setState({ loading: false });
    });
  };
  //a function for sending data to server.you can have many of these
  sendData = () => {
    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
    socket.emit('login', 'this is my data'); //send data to 'login' endpoint in server
  };

  updateSearch = search => {
    this.setState({ search: search });
  };

  render() {
    const { search } = this.state;
    return (
      <div className="FacultyTab">
        <Grid centered={true}>
          <Grid.Row>
            <NavbarHome active="faculty" />
            <ClassesHeader
              search={search}
              updateSearch={this.updateSearch}
              type="faculty"
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Grid columns={4} divided centered>
                <Container centered>
                  <Card.Group itemsPerRow={4}>
                    {this.state.faculty
                      .filter(item =>
                        item.name
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase())
                      )
                      .map((item, index) => (
                        <Card>
                          {item.isRegCom === 2 ? (
                            <RegComCard
                              name={item.name}
                              email={item.email_add}
                              isRegCom={item.isRegCom}
                            />
                          ) : (
                            <FacultyCard
                              name={item.name}
                              email={item.email_add}
                              isRegCom={item.isRegCom}
                            />
                          )}
                        </Card>
                      ))}
                  </Card.Group>
                </Container>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Loader active={this.state.loading} content="Loading..." />
      </div>
    );
  }
}

export default FacultyTab;

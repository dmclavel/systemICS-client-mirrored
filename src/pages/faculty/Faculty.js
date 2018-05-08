import React, { Component } from 'react';
import { Grid, Loader, Header } from 'semantic-ui-react';
import './Faculty.css';
import SubjectCard from './SubjectCard';
import Advisee from './Advisee';
import socketIOClient from 'socket.io-client';
import NavbarIn from '../components/navbar/NavbarIn';
import DashboardHeader from '../components/headers/DashboardHeader';
import SearchCard from '../../components/SearchCard';
import config from '../../config.json';
import debounce from 'debounce'

class Faculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: config.backendAddress, // the address of the server
      courses: [],
      advisees: [],
      visibleCourses: [],
      visibleAdvisees: [],
      email_add: 'nuzumaki@konoha.edu.lof',
      advisees_loading: true,
      sections_loading: true
    };
  }
  componentDidMount = () => {
    this.setState({
      advisees_loading: true,
      sections_loading: true
    });

    console.log('componentDidMount');
    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.emit('view_sections', {
      email_add: this.props.user.U3,
      active: true,
      petitioned: true,
      additional: true
    }); //send data to 'login' endpoint in server
    socket.on('view_sections', returnValueFromServer => {
      console.log("Return success");
      this.setState({
        courses: returnValueFromServer,
        visibleCourses: returnValueFromServer,
        sections_loading: false
      });
    });

    socket.on('update_alert', res => {
    	if (res === 'section') socket.emit('view_sections', {
      email_add: this.props.user.U3,
      active: true,
      petitioned: true,
      additional: true
    });
    });


    socket.emit('view_adviser_advisees', {
      current: true,
      adviser_email_add: this.props.user.U3
    }); //send data to 'login' endpoint in server
    socket.on('view_adviser_advisees', returnValueFromServer => {
      console.log("Return success");
      this.setState({
        advisees: returnValueFromServer,
        visibleAdvisees: returnValueFromServer,
        advisees_loading: false
      });
    });
  }

  handleCourseSearch = query => {
    if (!query.length) {
      this.setState({ visibleCourses: this.state.courses });
    } else {
      this.setState({
        visibleCourses: this.state.courses.filter(user => {
          if (user.course_name.toLowerCase().includes(query.toLowerCase()) || user.course_title.toLowerCase().includes(query.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        })
      });
    }
  };
  handleAdviseeSearch = query => {
    if (!query.length) {
      this.setState({ visibleAdvisees: this.state.advisees });
    } else {
      this.setState({
        visibleAdvisees: this.state.advisees.filter(user => {
          if (
            user.advisee_name.toLowerCase().includes(query.toLowerCase()) ||
            user.advisee_email_add
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            (user.advisee_student_number + '').includes(query.toLowerCase())
          ) {
            return true;
          } else {
            return false;
          }
        })
      });
    }
  };

  render() {
    return (
      <div>
        <section className="MainSection">
          <Grid>
            <Grid.Row>
              <NavbarIn active="dashboard" accessLvl={this.props.accessLvl} />
              <DashboardHeader
                user={this.props.user}
                accessLvl={this.props.accessLvl}
              />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={8}>
                <Grid.Row>
                  <Header as='h2' textAlign='center'>Teaching Load</Header>
                  <SearchCard
                    fluid={true}
                    handleSearch={debounce(this.handleCourseSearch, config.searchDelay)}
                    placeholder="course name or course title"
                  />
                </Grid.Row>
                <Grid.Row>
                  <Loader
                    active={this.state.sections_loading}
                    content="Loading your teaching load..."
                  />

                  {this.state.visibleCourses.map(course => {
                    return (
                      <SubjectCard
                        name={course.course_name}
                        title={course.course_title}
                        description={course.description}
                        section={course.section}
                        no_of_students={course.no_of_students}
                        capacity={course.max_capacity}
                        room={course.room}
                        time_start={course.time_start}
                        time_end={course.time_end}
                        day={course.day}
                      />
                    );
                  })}
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={1} />
              <Grid.Column width={5}>
                <Grid.Row>
                  <Header as='h2' textAlign='center'>Advisees</Header>
                  <SearchCard
                    fluid={true}
                    handleSearch={debounce(this.handleAdviseeSearch, config.searchDelay)}
                    placeholder="name, email or student id"
                  />
                </Grid.Row>
                <Grid.Row>
                  <Loader
                    active={this.state.sections_loading}
                    content="Loading your advisees..."
                  />
                  {this.state.visibleAdvisees.map(advisees => {
                    return (
                      <Advisee
                        name={advisees.advisee_name}
                        student_number={advisees.advisee_student_number}
                        curriculum={advisees.curriculum}
                        email={advisees.advisee_email_add}
                      />
                    );
                  })}
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={1} />
            </Grid.Row>
          </Grid>
        </section>
      </div>
    );
  }
}
export default Faculty;

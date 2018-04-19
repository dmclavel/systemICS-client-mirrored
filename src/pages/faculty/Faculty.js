import React, { Component } from 'react';
import {Grid, Search, Card, Input, Header, Button} from 'semantic-ui-react';
import './Faculty.css';
import SubjectCard from './SubjectCard';
import Advisee from './Advisee';
import socketIOClient from 'socket.io-client';
import NavbarIn from '../components/navbar/NavbarIn';
import DashboardHeader from '../components/headers/DashboardHeader';
import SearchCard from '../../components/SearchCard';

class Faculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'https://sleepy-falls-95372.herokuapp.com/', // the address of the server
      courses: [],
      advisees: [],
      visibleCourses: [],
      visibleAdvisees: [],
      email_add: 'nuzumaki@konoha.edu.lof'
    };
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.emit('search_assigned_sections_via_email', {
      email_add: this.state.email_add
    }); //send data to 'login' endpoint in server
    socket.on('search_assigned_sections_via_email', returnValueFromServer => {
      this.setState({
        courses: returnValueFromServer,
        visibleCourses: returnValueFromServer
      });
    });
    socket.emit('view_adviser_advisee_information_all', 'gpas@asdf.com'); //send data to 'login' endpoint in server
    socket.on('view_adviser_advisee_information_all', returnValueFromServer => {
      this.setState({
        advisees: returnValueFromServer,
        visibleAdvisees: returnValueFromServer
      });
    });
  };
  handleCourseSearch = query => {
    if (query.length == 0) {
      this.setState({ visibleCourses: this.state.courses });
      console.log(this.state.visibleCourses);
    } else {
      this.setState({
        visibleCourses: this.state.courses.filter(user => {
          if (user.course_name.toLowerCase().includes(query.toLowerCase())) {
            console.log(this.state.visibleCourses);
            return true;
          } else {
            return false;
          }
        })
      });
    }
  };
  handleAdviseeSearch = query => {
    if (query.length == 0) {
      this.setState({ visibleAdvisees: this.state.advisees });
      console.log(this.state.visibleAdvisees);
    } else {
      this.setState({
        visibleAdvisees: this.state.advisees.filter(user => {
          if (
            user.student_name.toLowerCase().includes(query.toLowerCase()) ||
            user.email_add.toLowerCase().includes(query.toLowerCase())
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
    console.log(this.state.advisees);
    return (
      <div>
        <section className="MainSection">
          <Grid>
              <Grid.Row>
                <NavbarIn active='dashboard' accessLvl={this.props.accessLvl}/>
                <DashboardHeader user={this.props.user} accessLvl={this.props.accessLvl}/>
              </Grid.Row>
               <Grid.Row>
                  <Grid.Column width={1}></Grid.Column>
                  <Grid.Column width={8}>
                     <Grid.Row>
                       <SearchCard fluid={true} handleSearch={this.handleCourseSearch} placeholder="course name, course title, or section"/>
                       {this.state.visibleCourses.map ((course)=>{
                          return <SubjectCard name={course.course_name} title={course.course_title} description={course.description} section={course.section} no_of_students={course.no_of_students} capacity={course.max_capacity} room={course.room} time_start={course.time_start} time_end={course.time_end}/>
                        })
                       }
                     </Grid.Row>
                  </Grid.Column>
                  <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Card fluid raised={true}>
                       <h2>Advisees</h2>
                    </Card>
                    <SearchCard fluid={true} handleSearch={this.handleAdviseeSearch} placeholder="name, email or student id"/>
                      {this.state.visibleAdvisees.map ((advisees)=>{
                          return <Advisee name={advisees.student_name} student_number={advisees.student_number} curriculum={advisees.curriculum} email={advisees.email_add}/>
                        })
                      }
                </Grid.Column>
                <Grid.Column width={1}>
                </Grid.Column>
             </Grid.Row>
        </Grid>
        </section>
     </div>
    );
  }
}
export default Faculty;

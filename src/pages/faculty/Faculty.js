import React, { Component } from 'react';
import {Grid, Search, Card, Input, Header} from 'semantic-ui-react';
import './Faculty.css';
import SubjectCard from './SubjectCard';
import Advisee from './Advisee';
import socketIOClient from 'socket.io-client';
import SearchAdvisee from './SearchAdvisee';
import SearchCourse from './SearchCourse';
import NavbarIn from '../components/NavbarIn';
import Heading from '../components/Heading';

class Faculty extends Component {
   constructor(props){
	    super(props);
	    this.state = {
	        endpoint: 'https://sleepy-falls-95372.herokuapp.com/',// the address of the server
          courses: [],
          advisees: []
      }
 	 }

   componentDidMount = () =>{
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    // listens on an endpoint and executes fallback function
		    socket.emit('view_all_active_faculty_teaching_load', 'gpas@asdf.com');//send data to 'login' endpoint in server
		    socket.on('view_all_active_faculty_teaching_load', (returnValueFromServer) => {
		      console.log(returnValueFromServer);
          this.setState({courses: returnValueFromServer})
		    });
        socket.emit('view_adviser_advisee_information_all', 'gpas@asdf.com');//send data to 'login' endpoint in server
		    socket.on('view_adviser_advisee_information_all', (returnValueFromServer) => {
		      console.log(returnValueFromServer);
          this.setState({advisees: returnValueFromServer})
		    });
		}


  render() {
    return(
     <div>
        <section className= 'MainSection'>
          <Grid>
              <Grid.Row>
                <NavbarIn />
                <Heading />
              </Grid.Row>
               <Grid.Row>
                  <Grid.Column width={1}></Grid.Column>
                  <Grid.Column width={8}>
                      <SearchCourse/>
                     <Grid.Row>
                        {this.state.courses.map ((course)=>{
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
                    <SearchAdvisee/>
                      {this.state.advisees.map ((advisees)=>{
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

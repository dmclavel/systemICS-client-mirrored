import React, { Component } from 'react';
import {Grid, Search, Card, Input, Header, Button} from 'semantic-ui-react';
import './Faculty.css';
import SubjectCard from './SubjectCard';
import Advisee from './Advisee';
import socketIOClient from 'socket.io-client';
<<<<<<< HEAD
import NavbarIn from '../components/navbar/NavbarIn';
=======
import SearchAdvisee from './SearchAdvisee';
import SearchCourse from './SearchCourse';
import NavbarIn from '../components/NavbarIn';
>>>>>>> 919a5259958f7a9972b1a9240b4041225b0df441
import Heading from '../components/Heading';

class Faculty extends Component {
   constructor(props){
	    super(props);
	    this.state = {
	        endpoint: 'https://sleepy-falls-95372.herokuapp.com/',// the address of the server
          courses: [],
          advisees: [],
          searchInput: ''
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
    handleCourseClick(e){
        this.setState({ searchInput: e.target.value });
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
                     <Grid.Row>
                       <Input fluid action={ <Button icon='search' onClick={ this.handleCourseClick } /> } placeholder='Search...' />
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
                    <Input fluid action={ <Button icon='search' onClick={ this.handleClick } /> } placeholder='Search...' />
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

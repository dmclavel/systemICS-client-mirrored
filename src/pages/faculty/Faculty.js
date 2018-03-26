import React, { Component } from 'react';
import {Grid, Search, Card, Input} from 'semantic-ui-react';
import './Faculty.css';
import SubjectCard from './SubjectCard';
import Advisee from './Advisee';
import socketIOClient from 'socket.io-client';

import NavbarIn from '../components/NavbarIn';
import Heading from '../components/Heading';

class Faculty extends Component {
   constructor(props){
	    super(props);
	    this.state = {
	        endpoint: 'http://10.0.5.153:3000' // the address of the server
	    }
 	}

   componentDidMount = () =>{
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    // listens on an endpoint and executes fallback function
		    socket.emit('view_all_faculty', 'this is my data');//send data to 'login' endpoint in server
		    socket.on('view_all_faculty', (returnValueFromServer) => {
		      console.log(returnValueFromServer);
		    });
		  }
		  //a function for sending data to server.you can have many of these
		  sendData = () => {
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    socket.emit('login', 'this is my data');//send data to 'login' endpoint in server
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
                        <SubjectCard name='CMSC 128 - Introduction to Software Engineering' time ='1:00-4:00PM' room='ICS PC LAB 4' capacity='20' section='A-8L'/>
                        <SubjectCard name='CMSC 128 - Introduction to Software Engineering' time ='1:00-4:00PM' room='ICS PC LAB 4' capacity='20' section='A-8L'/>
                        <SubjectCard name='CMSC 128 - Introduction to Software Engineering' time ='1:00-4:00PM' room='ICS PC LAB 4' capacity='20' section='A-8L'/>
                        <SubjectCard name='CMSC 128 - Introduction to Software Engineering' time ='1:00-4:00PM' room='ICS PC LAB 4' capacity='20' section='A-8L'/>
                        <SubjectCard name='CMSC 128 - Introduction to Software Engineering' time ='1:00-4:00PM' room='ICS PC LAB 4' capacity='20' section='A-8L'/>
                     </Grid.Row>
                  </Grid.Column>
                  <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Card fluid raised={true}>
                       Advisee/s of KBP Pelaez
                    </Card>
                    <Advisee adviseeName='Kobe Jee De Luna' studentNumber='2015-06683' email='kjdeluna@up.edu.ph'/>
                    <Advisee adviseeName='Kobe Jee De Luna' studentNumber='2015-06683' email='kjdeluna@up.edu.ph'/>
                    <Advisee adviseeName='Kobe Jee De Luna' studentNumber='2015-06683' email='kjdeluna@up.edu.ph'/>
                    <Advisee adviseeName='Kobe Jee De Luna' studentNumber='2015-06683' email='kjdeluna@up.edu.ph'/>
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

import React, { Component } from 'react';
import { Grid, Icon, Header, Segment } from 'semantic-ui-react';
import './Faculty.css';
import { convertToGeneralTime } from '../../utils/TimeUtilities';

/*
If you wish to import other JS files, do it here.
*/

class SubjectCard extends Component {
   render() { 
      return (
         <Segment>
            <Grid>
               <Grid.Row>
                  <Grid.Column width={3} textAlign="right">
                     <Header as="h3">{this.props.name}</Header>
                  </Grid.Column>
                  <Grid.Column width={9}>
                     <Header as="h3">{this.props.title}</Header>
                  </Grid.Column>
                  <Grid.Column width={3} textAlign="left">
                     <Header as="h3">{this.props.section}</Header>
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column width={4}>
                     <Header as="h5">
                        <Icon name="time" />
                        <Header.Content>
                           
                           {this.props.day} | {convertToGeneralTime(this.props.time_start)}-{convertToGeneralTime(this.props.time_end)}
                           <Header.Subheader>Time</Header.Subheader>
                        </Header.Content>
                     </Header>
                  </Grid.Column>
                  <Grid.Column width={4}>
                      <Header as="h5">
                        <Icon name="group" />
                        <Header.Content>
                           {this.props.no_of_students}
                           <Header.Subheader>
                              Current No. of Students
                           </Header.Subheader>
                        </Header.Content>
                     </Header>
                  </Grid.Column>
                  <Grid.Column width={4}>
                     <Header as="h5">
                        <Icon name="group" />
                        <Header.Content>
                           {this.props.capacity}
                           <Header.Subheader>Max Capacity</Header.Subheader>
                        </Header.Content>
                     </Header>
                  </Grid.Column>
                  <Grid.Column width={4}>
                     <Header as="h5">
                        <Icon name="desktop" />
                        <Header.Content>
                           {this.props.room}
                           <Header.Subheader>Room</Header.Subheader>
                        </Header.Content>
                     </Header>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Segment>
      );
   }
}
export default SubjectCard;

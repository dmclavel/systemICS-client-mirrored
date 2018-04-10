import React, { Component } from 'react';
import {Grid, Card, Icon, Header, List, Segment} from 'semantic-ui-react';
import './Faculty.css';

/*
If you wish to import other JS files, do it here.
*/

class SubjectCard extends Component {
  render() {
    return(
      <Segment>
         <Grid>
            <Grid.Row>
               <Grid.Column width={3} textAlign='right'>
                  <Header as='h3'>{this.props.name}</Header>
               </Grid.Column>
               <Grid.Column width={9}>
                  <Header as='h3'>{this.props.description}</Header>
               </Grid.Column>
               <Grid.Column width={3} textAlign='left'>
                  <Header as='h3'>{this.props.section}</Header>
                </Grid.Column>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={4}>
                  <Header as='h5'>
                     <Icon name='time' />
                     <Header.Content>
                        {this.props.time_start}-{this.props.time_end}
                        <Header.Subheader>
                           Time
                        </Header.Subheader>
                     </Header.Content>
                  </Header>
               </Grid.Column>
               <Grid.Column width={4}>
               <Header as='h5'>
                  <Icon name='group' />
                  <Header.Content>
                     {this.props.capacity}
                     <Header.Subheader>
                        Max Capacity
                     </Header.Subheader>
                  </Header.Content>
               </Header>
               </Grid.Column>
               <Grid.Column width={4}>
               <Header as='h5'>
                  <Icon name='group' />
                  <Header.Content>
                     {this.props.no_of_students}
                     <Header.Subheader>
                        Number of students
                     </Header.Subheader>
                  </Header.Content>
               </Header>
               </Grid.Column>
               <Grid.Column width={4}>
                  <Header as='h5'>
                     <Icon name='desktop' />
                     <Header.Content>
                        {this.props.room}
                        <Header.Subheader>
                           Room
                        </Header.Subheader>
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

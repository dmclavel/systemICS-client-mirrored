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
               <Grid.Column width={12}>
                  <Header as='h3'>{this.props.name}</Header>
               </Grid.Column>
               <Grid.Column width={1}>
               </Grid.Column>
               <Grid.Column width={2}>
                  <Header as='h3'>{this.props.section}</Header>
               </Grid.Column>
               <Grid.Column width={1}>
               </Grid.Column>

            </Grid.Row>
            <Grid.Row>
               <Grid.Column width={5}>
                  <Header as='h5'>
                     <Icon name='time' />
                     <Header.Content>
                        {this.props.time}
                        <Header.Subheader>
                           Time
                        </Header.Subheader>
                     </Header.Content>
                  </Header>
               </Grid.Column>
               <Grid.Column width={6}>
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
               <Grid.Column width={5}>
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

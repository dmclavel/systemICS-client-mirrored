/*
AUTHOR: Gaza, John Cedric C.
FILE: Template, to be used for basic JS pages in the system.

BASIC TEMPLATE FOR ALL JS PAGES
DO NOT FORGET TO DOCUMENT YOUR OWN CODE.
Change name Template to the name of file.
This will be updated for mapping, grid layouting, etc.
Write the Author of the code at the top of the document.
*/

import React, { Component } from 'react';
import {Segment, Grid, Container, Search} from 'semantic-ui-react';
import './Faculty.css';

/*
If you wish to import other JS files, do it here.
*/

class Faculty extends Component {
  render() {
    return(
     <div>
        <section className= 'MainSection'>
          <Grid>
               <Grid.Row>
                  <Grid.Column width={11}>
                    <Container id= 'LeftSide' className= 'MainSection'>
                      <Container textAlign='center'>
                        <Search id = "search-segment"/>
                        <Segment inverted color='brown'>
                          <Container textAlign='center'>
                          <p>Subjects</p>
                          </Container>
                        </Segment>
                        <Segment inverted color='teal'>
                           <Grid>
                              <Grid.Row columns={3}>
                                 <Grid.Column>
                                    CMSC 128
                                 </Grid.Column>
                                 <Grid.Column>
                                    A
                                 </Grid.Column>
                                 <Grid.Column>
                                    W F 7:00-8:00AM
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        </Segment>
                        <Segment inverted color='teal'>
                           <Grid>
                              <Grid.Row columns={3}>
                                 <Grid.Column>
                                    CMSC 128
                                 </Grid.Column>
                                 <Grid.Column>
                                    A-1L
                                 </Grid.Column>
                                 <Grid.Column>
                                    M 1:00-4:00PM
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        </Segment>
                        <Segment inverted color='teal'>
                           <Grid>
                              <Grid.Row columns={3}>
                                 <Grid.Column>
                                    CMSC 128
                                 </Grid.Column>
                                 <Grid.Column>
                                    A-2L
                                 </Grid.Column>
                                 <Grid.Column>
                                    T 1:00-4:00PM
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        </Segment>
                        <Segment inverted color='teal'>
                           <Grid>
                              <Grid.Row columns={3}>
                                 <Grid.Column>
                                    CMSC 128
                                 </Grid.Column>
                                 <Grid.Column>
                                    A-3L
                                 </Grid.Column>
                                 <Grid.Column>
                                    T 4:00-7:00PM
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        </Segment>
                        <Segment inverted color='teal'>
                           <Grid>
                              <Grid.Row columns={3}>
                                 <Grid.Column>
                                    CMSC 128
                                 </Grid.Column>
                                 <Grid.Column>
                                    A-4L
                                 </Grid.Column>
                                 <Grid.Column>
                                    W 1:00-4:00PM
                                 </Grid.Column>
                              </Grid.Row>
                           </Grid>
                        </Segment>
                      </Container>
                    </Container>
                  </Grid.Column>
                  <Grid.Column width={5}>
                  <Segment id= 'RightSide' className= 'MainSection'>
                      <Container textAlign='center'>
                        <Search
                          id = "search-segment"
                        />
                      </Container>
                      <Segment inverted color='brown'>
                        <Container textAlign='center'>
                        <p>Advisee/s of KBP Pelaez</p>
                        </Container>
                      </Segment>
                      <Segment inverted color='teal'>
                        <Container textAlign='center'>
                          <p>Kobe Jee De Luna</p>
                          <p>2015-06683</p>
                          <p>kjdeluna@up.edu.ph</p>
                        </Container>
                      </Segment>
                      <Segment inverted color='teal'>
                        <Container textAlign='center'>
                          <p>Kobe Jee De Luna</p>
                          <p>2015-06683</p>
                          <p>kjdeluna@up.edu.ph</p>
                        </Container>
                      </Segment>
                      <Segment inverted color='teal'>
                        <Container textAlign='center'>
                          <p>Kobe Jee De Luna</p>
                          <p>2015-06683</p>
                          <p>kjdeluna@up.edu.ph</p>
                        </Container>
                      </Segment>
                      <Segment inverted color='teal'>
                        <Container textAlign='center'>
                        <p>Princess Grubat</p>
                        <p>2015-05248</p>
                        <p>pvgrubat@up.edu.ph</p>
                        </Container>
                      </Segment>
                      <Segment inverted color='teal'>
                        <Container textAlign='center'>
                        <p>Queen Britney</p>
                        <p>2015-00000</p>
                        <p>qbspears@harvard.edu</p>
                        </Container>
                      </Segment>
                </Segment>
                </Grid.Column>
             </Grid.Row>
        </Grid>

        </section>
     </div>
    );
  }
}
export default Faculty;

/*
DELETE THE COMMENTS AFTER.
*/

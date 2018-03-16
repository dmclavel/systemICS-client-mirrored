/*
AUTHOR: Gotis, Ciara Mae
FILE: FacultyTab, to be used for basic JS pages in the system.

BASIC TEMPLATE FOR ALL JS PAGES
DO NOT FORGET TO DOCUMENT YOUR OWN CODE.
Change name FacultyTab to the name of file.
This will be updated for mapping, grid layouting, etc.
Write the Author of the code at the top of the document.
*/
import {Image, Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion, Segment} from "semantic-ui-react";
import React, { Component } from 'react';
import {/*  Insert names of components from Semantic-UI here*/} from 'semantic-ui-react';
import './FacultyTab.css';
import image from './sample.jpg';

/*
If you wish to import other JS files, do it here.
*/

class FacultyTab extends Component {
  render() {
    return(
      <div className='FacultyTab'>
      	<Container>
      		<Grid centered={true}>
      			<Grid.Row>
						<Grid.Column width={12} verticalAlign="middle">
							<Grid.Row>
								<Card id = "marginSearch" fluid={true} raised={true}>
					              <Card.Content>
					                <Input transparent={true} fluid={true} icon='search' iconPosition='left'/>
					              </Card.Content>
					            </Card>
				            </Grid.Row>
						</Grid.Column>
						<Grid.Column width={16} verticalAlign="middle">
							<Grid columns={4} divided>
								<Grid.Row>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
									<Grid.Column>
										<Card>
									      <Segment basic={true}>
									        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
									      </Segment>
									        <Card.Content>
									          <Card.Header>
									            Kim Ezekiel del Mundo
									          </Card.Header>
									          <Card.Meta>
									            kldelmundo@up.edu.ph
									          </Card.Meta>
									        </Card.Content>
									        <Card.Content extra>
									        Registration committee member
									        </Card.Content>
									      </Card>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Grid.Column>
				</Grid.Row>
      		</Grid>
      	</Container>
      </div>
    );
  }
}

export default FacultyTab;

/*
DELETE THE COMMENTS AFTER.
*/

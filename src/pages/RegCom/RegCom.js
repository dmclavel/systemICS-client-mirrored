import React, { Component } from 'react';
import { Grid, Container, Header, Input } from 'semantic-ui-react';
import Information from './Information';
import LoggedInNavBar from '../../components/LoggedInNavBar';

class RegCom extends Component {
  render() {
    const { title } = this.props;
    return (
      <div>
          <LoggedInNavBar />
        <Container>
          <Grid centered={true}>
            <Grid.Row>
              <div>
                  <Input
                    placeholder="Search faculty" icon="search"
                  />
              </div>
            </Grid.Row>
            <Grid.Row>
              <Header as="h1" color="teal" floated="left">
                {title}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12} stretched={true}>
                <Information name="Ariel Doria" units={18} />
              </Grid.Column>

              <Grid.Column width={12} stretched={true}>
                <Information name="Gerald Benedict Emalada" units={18} />
              </Grid.Column>

              <Grid.Column width={12} stretched={true}>
                <Information name="Lei Kristoffer Lactuan" units={18} />
              </Grid.Column>
              <Grid.Column width={12} stretched={true}>
                <Information name="Reginald Neil Recario" units={18} />
              </Grid.Column>
              <Grid.Column width={12} stretched={true}>
                <Information name="Katherine Loren Tan" units={18} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default RegCom;

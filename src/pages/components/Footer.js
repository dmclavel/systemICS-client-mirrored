import React, { Component } from 'react';
import { Grid, Image, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer-main">
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Footer;

import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer-main">
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <div />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Footer;

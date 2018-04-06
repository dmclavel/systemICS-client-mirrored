import React, { Component } from 'react';
import {Card, Input, Search} from 'semantic-ui-react';
import './Faculty.css';


class SearchAdvisee extends Component {
  render() {
    return(
        <Card fluid>
        <Input transparent placeholder='Search...' />
      </Card>
    );
  }
}
export default SearchAdvisee;

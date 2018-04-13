import React, { Component } from 'react';
import {Card, Input} from 'semantic-ui-react';
import './Faculty.css';

/*
If you wish to import other JS files, do it here.
*/

class SearchCourse extends Component {
  render() {
    return(
      <Card fluid>
        <Input transparent placeholder='Search...' />
      </Card>
    );
  }
}
export default SearchCourse;

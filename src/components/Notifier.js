import React, { Component } from 'react';
import {Label, Button, Icon} from 'semantic-ui-react';
import autobind from 'react-autobind';

class Notifier extends Component{
  constructor(props){
    super(props);
    this.state={
      notificationCount: 0
    }
  }

  render(){
    return(
      <div>
        <Button circular={true} icon={this.props.icon}></Button>
        <Label attached='top right' content={this.props.notifCount} circular={true} color='red'/>
      </div>

    );
  }
}
export default Notifier;

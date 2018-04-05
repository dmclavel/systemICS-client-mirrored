import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import AddCourseLab from './AddCourseLab';
import EditCourse from './EditCourse';
import DeleteCourse from './DeleteCourse';
class CourseRow extends Component {

	constructor(){
		super()

		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			coursesX : []
		}
	}
	
	componentDidMount(){
			const socket = socketIOClient(this.state.address);
			const data = {email: 'pvgrubat@up.edu.ph'};
			socket.emit("view_all_active_course_offerings", data);
			socket.on("view_all_active_course_offerings", (course) => {
				this.setState({coursesX:course});
				console.log(this.state.coursesX);
			});
		}
		
  render() {
  	if(this.props.section_type == 0)
    return(

        <Table.Row>
          <Table.Cell>{this.props.coursecode}</Table.Cell>
          <Table.Cell>{this.props.section}</Table.Cell>
          <Table.Cell>{this.props.time_start}-{this.props.time_end}</Table.Cell>
          <Table.Cell>{this.props.room}</Table.Cell>
          <Table.Cell>{this.props.students}</Table.Cell>
          <Table.Cell>
            <AddCourseLab/> <EditCourse coursecode={this.props.coursecode} section={this.props.section}/> <DeleteCourse coursecode={this.props.coursecode} section={this.props.section}/>
          </Table.Cell>
        </Table.Row>
    );
    
    else return(

        <Table.Row>
          <Table.Cell>{this.props.coursecode}</Table.Cell>
          <Table.Cell>{this.props.section}</Table.Cell>
          <Table.Cell>{this.props.time_start}-{this.props.time_end}</Table.Cell>
          <Table.Cell>{this.props.room}</Table.Cell>
          <Table.Cell>{this.props.students}</Table.Cell>
          <Table.Cell>
             <EditCourse coursecode={this.props.coursecode} section={this.props.section}/> <DeleteCourse coursecode={this.props.coursecode} section={this.props.section}/>
          </Table.Cell>
        </Table.Row>
    );
  }
}

export default CourseRow;

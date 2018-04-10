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
						{console.log(this.props.course)}
            <AddCourseLab/> <EditCourse empno={this.props.empno} courseoffering={this.props.courseoffering} title={this.props.title} course={this.props.course} coursecode={this.props.coursecode} section={this.props.section} timestart={this.props.time_start} timeend={this.props.time_end} room={this.props.room} day={this.props.day} section={this.props.section} maxcapacity={this.props.maxcapacity} noofstudents={this.props.students} acadyear={this.props.acadyear} sem={this.props.sem} unit={this.props.unit}/> <DeleteCourse coursecode={this.props.coursecode} section={this.props.section}/>
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
						 {console.log(this.props.course)}
             <EditCourse desc={this.props.description} empno={this.props.empno} courseoffering={this.props.courseoffering} title={this.props.title} course={this.props.course} coursecode={this.props.coursecode} section={this.props.section} timestart={this.props.time_start} timeend={this.props.time_end} room={this.props.room} day={this.props.day} section={this.props.section} maxcapacity={this.props.maxcapacity} noofstudents={this.props.students} acadyear={this.props.acadyear} sem={this.props.sem} unit={this.props.unit}/> <DeleteCourse coursecode={this.props.coursecode} section={this.props.section}/>
          </Table.Cell>
        </Table.Row>
    );
  }
}

export default CourseRow;

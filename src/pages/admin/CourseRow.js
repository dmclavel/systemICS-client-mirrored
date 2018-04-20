import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import AddLabSection from './AddLabSection';
import EditCourse from './EditCourse';
import DeleteCourse from './DeleteCourse';
import { convertToGeneralTime } from '../../utils/TimeUtilities';

class CourseRow extends Component {
  constructor() {
    super();

    this.state = {
      address: 'https://sleepy-falls-95372.herokuapp.com/',
      coursesX: []
    };
  }

  //if section_type == 0 then LECTURE
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.coursecode}</Table.Cell>
        <Table.Cell>{this.props.section}</Table.Cell>
        <Table.Cell>{this.props.day}</Table.Cell>
        <Table.Cell>
          {`${convertToGeneralTime(
            this.props.time_start
          )}-${convertToGeneralTime(this.props.time_end)}`}
        </Table.Cell>
        <Table.Cell>{this.props.room}</Table.Cell>
        <Table.Cell>{this.props.maxcapacity}</Table.Cell>
        <Table.Cell>{this.props.students}</Table.Cell>
        <Table.Cell>{this.props.status}</Table.Cell>
        <Table.Cell>
          {this.props.section_type === 0 ? (
            <AddLabSection
              courseLecID={this.props.course}
              coursecode={this.props.coursecode}
              fetchCourse={this.props.fetch_Course}
              section={this.props.section}
              acadyear={this.props.acad_year}
              sem={this.props.semester}
              courseoffering={this.props.courseoffering}
            />
          ) : null}

          <EditCourse
            fetchCourse={this.props.fetch_Course}
            emp_no={this.props.empno}
            courseoffering={this.props.courseoffering}
            title={this.props.title}
            course={this.props.course}
            coursecode={this.props.coursecode}
            section={this.props.section}
            timestart={this.props.time_start}
            timeend={this.props.time_end}
            room={this.props.room}
            day={this.props.day}
            maxcapacity={this.props.maxcapacity}
            noofstudents={this.props.students}
            acadyear={this.props.acadyear}
            sem={this.props.sem}
            unit={this.props.unit}
            status={this.props.status}
            section_type={this.props.section_type}
          />

          <DeleteCourse
            coursecodeid={this.props.courseoffering}
            section={this.props.section}
            fetchCourse={this.props.fetch_Course}
            coursecode={this.props.coursecode}
            section_type={this.props.section_type}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default CourseRow;

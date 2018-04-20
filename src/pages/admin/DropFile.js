import React, { Component } from 'react';
import { Modal, Segment, Button, Divider, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import socketIOClient from 'socket.io-client';
import './DropFile.css';

const inlineStyle = {
	modal: {
		marginTop: '10vh !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'
	}
};

class DropFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			string: '',
			file_type_selected: 0
		};

		this.handleOnDrop = this.handleOnDrop.bind(this);
		this.handleChangeFileTypeSelected = this.handleChangeFileTypeSelected.bind(this)
	}
	handleChangeFileTypeSelected(file_type_selected) {
		this.setState({file_type_selected})
	}

	handleOnDrop = file => {
		var readerFile = new FileReader()
    //var fileDisplay = document.getElementById("fileDisplay")
    var textType = /^[A-Za-z_()0-9]*\.csv$/                             // regex of file type to be accepted
    var studentCSV = "STUDENT_NUMBER,NAME,CURRICULUM,EMAIL_ADD,STATUS"
    var facultyCSV = "EMP_NO,NAME,EMAIL_ADD,STATUS,ISREGCOM"
    var adminCSV = "USERNAME,PASSWORD"
    var adviser_adviseeCSV = "ACAD_YEAR,SEMESTER,EMP_NO,STUDENT_NUMBER,STATUS"
    var courseCSV = "COURSE_NAME,COURSE_TITLE,DESCRIPTION"
    var senior_juniorCSV = "ADVISER_EMP_NO,ADVISEE_EMP_NO"
    var course_offeringCSV = "ACAD_YEAR,SEMESTER,TIME_START,TIME_END,ROOM,NO_OF_STUDENTS,UNIT,DAY,SECTION,SECTION_TYPE,MAX_CAPACITY,COURSE_ID,EMP_NO,STATUS,POSTED"
    const address = this.state.address
    const file_type_selected = this.state.file_type_selected
    if(file[0].name.match(textType)) {
      readerFile.onload = function(e){                           // shows the content string of file
        
        const socket = socketIOClient(address)
        const data = {
          string : readerFile.result,
          file_type: file_type_selected
        }
        var stringTempStudent = data.string.substring(0,47)
        var stringTempFaculty = data.string.substring(0,37)
        var stringTempAdmin = data.string.substring(0,17)
        var stringTempAdviserAdvisee = data.string.substring(0,47)
        var stringTempCourse = data.string.substring(0,36)
        var stringTempSeniorJunior = data.string.substring(0,29)
        var stringTempCourseOffering = data.string.substring(0,132)
        if(stringTempStudent===studentCSV && data.file_type===1){
          console.log("STUDENT \n"+data.string) 
        //  socket.emit('file_content_student', data);  
        }else if(stringTempFaculty===facultyCSV && data.file_type===2){
          console.log("FACULTY \n"+data.string)
        //  socket.emit('file_content_faculty', data);
        }else if(stringTempAdmin===adminCSV && data.file_type===3){
          console.log("ADMIN \n"+data.string) 
        //  socket.emit('file_content_admin', data);
        }else if(stringTempAdviserAdvisee===adviser_adviseeCSV && data.file_type===4){
          console.log("ADVISER_ADVISEE \n"+data.string)
        //  socket.emit('file_content_adviser_advisee', data);
        }else if(stringTempCourse===courseCSV && data.file_type===5){
          console.log("COURSE \n"+data.string)
        //  socket.emit('file_content_course', data);
        }else if(stringTempCourseOffering===course_offeringCSV && data.file_type===6){
          console.log("COURSE_OFFERING \n"+data.string)
        //  socket.emit('file_content_course_offering', data);
        }else if(stringTempSeniorJunior===senior_juniorCSV && data.file_type===7){
          console.log("SENIOR_JUNIOR \n"+data.string)
        //  socket.emit('file_content_senior_junior', data);
        }else{
          console.log("ERROR \n"+data.string)
        //  socket.emit('file_content_error', data);
        }
      }
      readerFile.readAsText(file[0])
    }else{
      console.log("File not supported! \n Only accepts csv file")
    }
	};

	render() {
		const { files } = this.state;

		return (
			<Modal
				size="large"
				style={inlineStyle.modal}
				onClose={this.close}
				trigger={<Button content="Import File" color="blue" />}
				closeIcon
			>
				<Modal.Header>Drop Files Here</Modal.Header>
				<Modal.Content>
					<div>
						<Dropzone
							className="dropzone"
							onDrop={files =>
								files.length === 1 ? this.handleOnDrop(files) : null
							}
						>
							<div className="dropzone-text">
								<Header as="h1" content="Drop files here!" />
								<Divider horizontal>OR</Divider>

								<div>
									<Dropzone
										className="dropzone-button"
										onDrop={files =>
											files.length === 1 ? this.handleOnDrop(files) : null
										}
									>
										<p className="dropzone-button-text">Select files here</p>
									</Dropzone>
								</div>
							</div>
						</Dropzone>
					</div>
					<Button content="Student" onClick={() => this.handleChangeFileTypeSelected(1)}/>
					<Button content="Faculty" onClick={() => this.handleChangeFileTypeSelected(2)}/>
					<Button content="Admin" onClick={() => this.handleChangeFileTypeSelected(3)}/>
					<Button content="Adviser Advisee" onClick={() => this.handleChangeFileTypeSelected(4)}/>
					<Button content="Course" onClick={() => this.handleChangeFileTypeSelected(5)}/>
					<Button content="Course Offering" onClick={() => this.handleChangeFileTypeSelected(6)}/>
					<Button content="Senior Junior" onClick={() => this.handleChangeFileTypeSelected(7)}/>
				</Modal.Content>
			</Modal>
		);
	}
}

export default DropFile;

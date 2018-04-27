import React, { Component } from 'react';
import {
  Modal,
  Button,
  Message,
  Header,
  Divider,
  Label
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import socketIOClient from 'socket.io-client';
import './DropFile.css';
import config from './../../config.json';

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
      file_type_selected: 1,
      filename: '',
      response: '',
      error: false,
      message: false,
      method: '',
      data: {
        string: '',
        file_type: 0
      },
      endpoint: config.backendAddress
    };

    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.handleChangeFileTypeSelected = this.handleChangeFileTypeSelected.bind(
      this
    );
  }
  handleChangeFileTypeSelected = file_type_selected => {
    this.setState({ file_type_selected });
  };

  handleOnDrop = file => {
    var readerFile = new FileReader();
    //var fileDisplay = document.getElementById("fileDisplay")
    var textType = /^[A-Za-z_()0-9]*\.csv$/; // regex of file type to be accepted
    var studentCSV = 'STUDENT_NUMBER,NAME,CURRICULUM,EMAIL_ADD,STATUS';
    var facultyCSV = 'EMP_NO,NAME,EMAIL_ADD,STATUS,ISREGCOM';
    var adminCSV = 'USERNAME,PASSWORD';
    var adviser_adviseeCSV = 'ACAD_YEAR,SEMESTER,EMP_NO,STUDENT_NUMBER,STATUS';
    var courseCSV = 'COURSE_NAME,COURSE_TITLE,DESCRIPTION';
    var senior_juniorCSV = 'ADVISER_EMP_NO,ADVISEE_EMP_NO';

    this.setState({
      filename: file[0].name,
      message: true,
      error: false,
      filename: ''
    });

    var course_offeringCSV =
      'ACAD_YEAR,SEMESTER,TIME_START,TIME_END,ROOM,NO_OF_STUDENTS,UNIT,DAY,SECTION,SECTION_TYPE,MAX_CAPACITY,COURSE_ID,EMP_NO,STATUS,POSTED';
    const address = this.state.address;
    const file_type_selected = this.state.file_type_selected;

    if (file[0].name.match(textType)) {
      readerFile.onload = e => {
        const socket = socketIOClient(address);
        const data = {
          string: e.target.result,
          file_type: file_type_selected
        };
        var stringTempStudent = data.string.substring(0, 47);
        var stringTempFaculty = data.string.substring(0, 37);
        var stringTempAdviserAdvisee = data.string.substring(0, 47);
        var stringTempCourse = data.string.substring(0, 36);
        var stringTempCourseOffering = data.string.substring(0, 132);

        if (stringTempStudent === studentCSV && data.file_type === 1) {
          this.setState({ data, method: 'file_content_student' });
        } else if (stringTempFaculty === facultyCSV && data.file_type === 2) {
          this.setState({ data, method: 'file_content_faculty' });
        } else if (
          stringTempAdviserAdvisee === adviser_adviseeCSV &&
          data.file_type === 4
        ) {
          this.setState({ data, method: 'file_content_adviser_advisee' });
        } else if (stringTempCourse === courseCSV && data.file_type === 5) {
          this.setState({ data, method: 'file_content_course' });
        } else if (
          stringTempCourseOffering === course_offeringCSV &&
          data.file_type === 6
        ) {
          this.setState({ data, method: 'file_content_course_offering' });
        } else {
          this.setState({
            error: true,
            filename: 'The file did not match with our records.'
          });
        }
      };

      readerFile.readAsText(file[0]);
    } else {
      this.setState({ error: true });
    }
  };

  handleSubmit = () => {
    const { data, endpoint, method, error, filename } = this.state;
    if (!error) {
      const socket = socketIOClient(endpoint);
      socket.emit(method, data);
      socket.on(method, response => {
        this.setState({ response });
        console.log(response);
      });
    } else {
      this.setState({
        filename: 'You cannot proceed until requirements are met.'
      });
    }
  };

  close = () => {
    this.setState(null);
  };

  render() {
    const { files, file_type_selected, filename, message, error } = this.state;

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
            <Button.Group widths="6">
              <Label
                attached
                basic
                size="huge"
                pointing="right"
                content="Classification"
              />
              <Button
                content="Student"
                color={file_type_selected === 1 ? 'green' : null}
                onClick={() => this.handleChangeFileTypeSelected(1)}
              />
              <Button
                content="Faculty"
                color={file_type_selected === 2 ? 'green' : null}
                onClick={() => this.handleChangeFileTypeSelected(2)}
              />
              <Button
                content="Adviser Advisee"
                color={file_type_selected === 4 ? 'green' : null}
                onClick={() => this.handleChangeFileTypeSelected(4)}
              />
              <Button
                content="Course"
                color={file_type_selected === 5 ? 'green' : null}
                onClick={() => this.handleChangeFileTypeSelected(5)}
              />
              <Button
                content="Course Offering"
                color={file_type_selected === 6 ? 'green' : null}
                onClick={() => this.handleChangeFileTypeSelected(6)}
              />
            </Button.Group>
            <br />
            <br />
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

            {message && (
              <Message
                icon="file text outline"
                header={error ? 'Error:' : 'File to upload:'}
                error={error}
                content={filename}
              />
            )}
          </div>
        </Modal.Content>
        <Modal.Actions className="modal-actions">
          <Button
            content="Submit"
            floated="right"
            positive
            onClick={this.handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DropFile;

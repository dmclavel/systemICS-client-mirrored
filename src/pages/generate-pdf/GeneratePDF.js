import React, { Component } from 'react';
import ics from './ics.gif';
import uplb from './uplb.jpg';
import './GeneratePDF.css';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import config from '../../config.json';

class GeneratePDF extends Component {
	constructor() {
		super();

		this.state = {
			endpoint: config.backendAddress, // the address of the server
			date: `${new Date().toLocaleString('en-us', {
				month: 'long'
			})} ${new Date().getDate()}, ${new Date().getFullYear()}`,
			dissolved: [],
			petitioned: [],
			additional: [],
			table4: []
		};
		autobind(this);
	}

	componentDidMount() {
		const socket = socketIOClient(this.state.endpoint);
		socket.emit('view_sections', {
			dissolved: true,
			active: false,
			petitioned: false,
			additional: false
		});
		socket.on('view_sections', dissolved => {
			this.setState({ dissolved });
			console.log(dissolved);
		});

		socket.emit('view_sections', {
			petitioned: true,
			active: false,
			dissolved: false,
			additional: false
		});
		socket.on('view_sections', petitioned => {
			this.setState({ petitioned });
		});

		socket.emit('view_sections', {
			additional: true,
			active: false,
			dissolved: false,
			petitioned: false
		});
		socket.on('view_sections', additional => {
			this.setState({ additional });
		});

		// console.log(this.state);

		// socket.emit('view_sections', { dissolved: true });
		// socket.on('view_sections', informations => {
		//   this.setState({
		//     table1:informations
		//   });
		// });

		// if (
		// 	this.state.additional.length > 0 &&
		// 	this.state.dissolved.length > 0 &&
		// 	this.this.state.petitioned.length > 0
		// )
		// 	window.print();
	}

	render() {
		const { date, dissolved, petitioned, additional } = this.state;

		return (
			<div className="page-main">
				<div className="headerICS">
					<img className="up" src={uplb} alt="UPLB Logo" />
					<img className="icsl" src={ics} alt="ICS Logo" />
					<h1 className="ics">INSTITUTE OF COMPUTER SCIENCE</h1>
					<h2 className="ics2">
						College of Arts and Sciences<br />
						University of the Philippines Los Baños<br />
						4031 College, Laguna, PHILIPPINES<br />
						Telefax +63 49 536 2302
					</h2>
				</div>

				<br />
				<div>
					<p className="date">{date}</p>
				</div>
				<br />

				<div>
					<p className="salutation">
						Dr. Fernando C. Sanchez, Jr.<br />
						Chancellor<br />
						UPLB, College, Laguna<br />
						(Through Channels)
					</p>
				</div>

				<div>
					<br />
					<p className="greeting">Dear Chancellor Sanchez:</p>
					<br />
				</div>

				<div>
					<p className="introLetter">
						This is to submit to your office the final course offering of the
						Institute of Computer Science for [Current Semester] with the
						following changes and information:
					</p>
				</div>

				<div>
					<br />
					<p className="tableA">
						<strong>A. Dissolved Sections</strong>
					</p>
					<br />
					<table className="t1">
						<tr>
							<th className="th1 td">Course Code/Title</th>
							<th className="th1 td">Section(s)</th>
							<th className="th1 td">Reason for Dissolution</th>
						</tr>
						{dissolved &&
							dissolved.map((section, index) => (
								<tr key={index}>
									<td className="td">{section.course_name}</td>
									<td className="td">{section.section}</td>
									<td className="td"> </td>
								</tr>
							))}
					</table>
				</div>

				<div>
					<br />
					<p className="tableB">
						<strong>B. Petitioned Sections</strong>
					</p>
					<br />
					<table className="t2">
						<tr>
							<th className="th1 td">Course Code/Title</th>
							<th className="th1 td">Section(s)</th>
							<th className="th1 td">Reason for Dissolution</th>
						</tr>
						{petitioned &&
							petitioned.map((section, index) => (
								<tr key={index}>
									<td className="td">{section.course_name}</td>
									<td className="td">{section.section}</td>
									<td className="td"> </td>
								</tr>
							))}
					</table>
				</div>

				<div>
					<br />
					<p className="tableC">
						<strong>C. Additional Sections</strong>
					</p>
					<br />
					<table className="t3">
						<tr>
							<th className="th1 td">Course Code/Title</th>
							<th className="th1 td">Section(s)</th>
							<th className="th1 td">Reason for Dissolution</th>
						</tr>
						{additional &&
							additional.map((section, index) => (
								<tr key={index}>
									<td className="td">{section.course_name}</td>
									<td className="td">{section.section}</td>
									<td className="td"> </td>
								</tr>
							))}
					</table>
				</div>

				<div>
					<br />
					<p className="tableD">
						<strong>D. Low Class Size Sections</strong>
					</p>
					<br />
					<table className="t4">{/* Map here */}</table>
				</div>

				<div>
					<br />
					<br />
					<p className="closing">Very truly yours, </p>
				</div>

				<div>
					<br />
					<p className="icsDirector">
						<strong>JAIME M. SAMANIEGO</strong>
						<br />
						Director, ICS
					</p>
				</div>

				<div>
					<br />
					<br />
					<p className="recommApproval"> RECOMMENDING APPROVAL </p>
					<br />
					<br />
					<p className="recommNames">
						<b>
							IVAN MARCELO A. DUKA
							&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
							FELINO P. LANSIGAN
						</b>{' '}
						<br />&nbsp;&nbsp; College Secretary, CAS
						&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
						Dean, CAS{' '}
					</p>
				</div>
			</div>
		);
	}
}

export default GeneratePDF;

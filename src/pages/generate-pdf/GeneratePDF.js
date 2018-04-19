import React, { Component } from 'react';
import ics from './ics.gif';
import uplb from './uplb.jpg';

class GeneratePDF extends Component {
	constructor() {
		super();

		this.state = {
			date: new Date().toDateString()
		};
	}

	render() {
		const { date } = this.state;

		return (
			<div className="page">
				<div className="headerICS">
					<img className="up" src={uplb} />
					<img className="icsl" src={ics} />
					<h1 class="ics">INSTITUTE OF COMPUTER SCIENCE</h1>
					<h2 class="ics2">
						College of Arts and Sciences<br />
						University of the Philippines Los Baños<br />
						4031 College, Laguna, PHILIPPINES<br />
						Telefax +63 49 536 2302
					</h2>
				</div>

				<br />
				<div className="date">
					<p className="date">{date}</p>
				</div>
				<br />

				<div className="salutation">
					<p>
						Dr. Fernando C. Sanchez, Jr.<br />
						Chancellor<br />
						UPLB, College, Laguna<br />
						(Through Channels)
					</p>
				</div>

				<div className="greeting">
					<br />
					<p>Dear Chancellor Sanchez:</p>
					<br />
				</div>

				<div className="introLetter">
					<p>
						This is to submit to your office the final course offering of the
						Institute of Computer Science for [Current Semester] with the
						following changes and information:
					</p>
				</div>

				<div className="tableA">
					<br />
					<p>
						<strong>A. Dissolved Sections</strong>
					</p>
					<br />
					<table>{/* Map here */}</table>
				</div>

				<div className="tableB">
					<br />
					<p>
						<strong>B. Petitioned Sections</strong>
					</p>
					<br />
					<table>{/* Map here */}</table>
				</div>

				<div className="tableC">
					<br />
					<p>
						<strong>C. Additional Sections</strong>
					</p>
					<br />
					<table>{/* Map here */}</table>
				</div>

				<div className="tableD">
					<br />
					<p>
						<strong>D. Low Class Size Sections</strong>
					</p>
					<br />
					<table>{/* Map here */}</table>
				</div>

				<div className="closing">
					<br />
					<br />
					<p>Very truly yours, </p>
				</div>

				<div className="icsDirector">
					<br />
					<p>
						<strong>JAIME M. SAMANIEGO</strong>
						<br />
						Director, ICS
					</p>
				</div>

				<div className="recommApproval">
					<br />
					<br />
					<p> RECOMMENDING APPROVAL </p>
					<br />
					<br />
				</div>
			</div>
		);
	}
}

export default GeneratePDF;

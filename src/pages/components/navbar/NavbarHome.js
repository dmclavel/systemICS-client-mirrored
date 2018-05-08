import React, { Component } from 'react';
import { Menu, Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavbarHome.css';
import Logo from './logo-transparent-no-stroke.png';

class NavbarHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.active
		};
	}

	handleContextRef = contextRef => this.setState({ contextRef });
	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;
		return (
			<div className="nav-home">
				<Grid>
					<Grid.Row>
						<Grid.Column width={5}>
							<a href="/">
								<img src={Logo} alt="SystemICS" className="nav-logo" />
							</a>
							<div className="nav-name-container">
								<a href="/" className="nav-logo-name">
									SYSTEM<span className="font-white">ICS</span>
								</a>
							</div>
						</Grid.Column>
						<Grid.Column width={6}>
							<Menu className="nav-menu" pointing secondary>
								<Link to="/">
									<Menu.Item
										className="nav-item"
										name="home"
										active={activeItem === 'home'}
										onClick={this.handleItemClick}
									/>
								</Link>
								<Link to="/classes">
									<Menu.Item
										className="nav-item"
										name="classes"
										active={activeItem === 'classes'}
										onClick={this.handleItemClick}
									/>
								</Link>
								<Link to="/faculty">
									<Menu.Item
										className="nav-item"
										name="faculty"
										active={activeItem === 'faculty'}
										onClick={this.handleItemClick}
									/>
								</Link>
							</Menu>
						</Grid.Column>
						<Grid.Column width={5}>
							<Link to="/login">
								<Button
									className="nav-login font-white"
									icon="sign in alternate"
									content="LOGIN"
								/>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default NavbarHome;

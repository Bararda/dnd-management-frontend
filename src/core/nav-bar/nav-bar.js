import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { LogoutButton } from '../../components/generic';
import './nav-bar.css';
import PropTypes from 'prop-types';

function NavBar() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="blue" variant="dark">
			<Navbar.Brand href="#home">
				<img
					src={require('../../assets/images/dnd_logo.svg')}
					className="nav-logo"
					alt="dnd"
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href={'/home/'}>Home</Nav.Link>
					<NavItem href="spells">Spells</NavItem>
					<NavItem href="characterSheetBuilder">
						Character Sheet Builder
					</NavItem>

				</Nav>
                <Nav>
                    <NavBarDropDown></NavBarDropDown>
                </Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

function NavItem(props) {
	return <Nav.Link href={'/home/' + props.href}>{props.children}</Nav.Link>;
}
NavItem.propTypes = {
	href: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
};

function NavLogo(props) {
	return (
		<Navbar.Brand className="logo" href={props.href}>
			{props.children}
		</Navbar.Brand>
	);
}

function NavBarDropDown(props) {
	return (
		<NavDropdown title="Account">
			<NavDropdown.Item>
				<LogoutButton></LogoutButton>
			</NavDropdown.Item>
		</NavDropdown>
	);
}

NavLogo.propTypes = {
	href: PropTypes.string,
	children: PropTypes.object,
};

export default NavBar;

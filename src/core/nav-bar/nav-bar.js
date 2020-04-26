import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import './nav-bar.css';
import PropTypes from 'prop-types';

function NavBar() {
    return (
        <Navbar className="nav-bar">
            <NavLogo><img src={require('../../assets/images/dnd_logo.svg')} className="nav-logo" alt="dnd"/></NavLogo>
            <NavItem href="home">Home</NavItem>
            <NavItem href="spells">Spells</NavItem>
        </Navbar>
    );
}

function NavItem(props) {
    return (
        <Nav.Item>
            <Nav.Link href={'/home/' + props.href}>{props.children}</Nav.Link>
        </Nav.Item>
    );
}
NavItem.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

function NavLogo(props) {
    return (
        <Navbar.Brand className="" href={props.href}>{props.children}</Navbar.Brand>
    );
}

NavLogo.propTypes = {
    href: PropTypes.string,
    children: PropTypes.object
};

export default NavBar;

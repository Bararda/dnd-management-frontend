import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import "./nav-bar.css";
function NavBar(props) {
    return (
        <Navbar className="nav-bar">
            <NavLogo><img src={require("./dnd_logo.svg")} className="nav-logo" alt="dnd"/></NavLogo>
            <NavItem href="#home">Home</NavItem>
        </Navbar>
    );
}

function NavItem(props) {
    return (
        <Nav.Item>
            <Nav.Link href={props.href}>{props.children}</Nav.Link>
        </Nav.Item>
    );
}

function NavLogo(props) {
    return (
        <Navbar.Brand className="" href={props.href}>{props.children}</Navbar.Brand>
    )
}

export default NavBar;

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import "./nav-bar.css"
interface NavItemProps {
    name?: string, // Change the required prop to an optional prop.
    href?: string,
}
interface NavLogoProps {
    href?: string,
}
function NavBar() {
    return (
        <Navbar className="nav-bar">
            <NavLogo><img src={require("../../assets/images/dnd_logo.svg")} className="nav-logo" alt="dnd"/></NavLogo>
            <NavItem href="home">Home</NavItem>
            <NavItem href="spells">Spells</NavItem>
        </Navbar>
    );
}

const NavItem: React.FC<NavItemProps> = (props) => {
    return (
        <Nav.Item>
            <Nav.Link href={"/home/" + props.href}>{props.children}</Nav.Link>
        </Nav.Item>
    );
}

const NavLogo: React.FC<NavLogoProps> = (props) => {
    return (
        <Navbar.Brand className="" href={props.href}>{props.children}</Navbar.Brand>
    );
}

export default NavBar;

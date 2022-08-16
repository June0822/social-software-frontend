import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

export default function SideNavbar () {
    return (
        <Nav className="flex-column">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/notification">Notifications</NavLink>
          <NavLink to="/chat">Messages</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </Nav>
    );
}
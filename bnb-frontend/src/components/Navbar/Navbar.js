import React from 'react';
import { Nav, NavElement, NavLink } from './Navbar.style';

const Navbar = () => {
  return (
    <Nav className='Navbar'>
      <NavElement className='NavbarElement'>
        <NavLink href='book-rooms'>Book Rooms</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href='order'>Order Food</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href='notifications'>Notifications</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href='tourBooking'>Tour Booking</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href='reports'>Reports</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href='visualizations'>Visualization</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href='chat'>Chat Support</NavLink>
      </NavElement>
    </Nav>
  );
};

export default Navbar;

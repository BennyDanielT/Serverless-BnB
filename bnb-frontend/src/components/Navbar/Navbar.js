import React from 'react';
import { Nav, NavElement, NavLink } from './Navbar.style';

const Navbar = () => {
    return (
        <Nav className='Navbar'>
            <NavElement className='NavbarElement'><NavLink href="bookRooms">Book Rooms</NavLink></NavElement>
            <NavElement><NavLink href="orderFood">Order Food</NavLink></NavElement>
            <NavElement><NavLink href="tourBooking">Tour Booking</NavLink></NavElement>
            <NavElement><NavLink href="reports">Reports</NavLink></NavElement>
            <NavElement><NavLink href="visualization">Visualization</NavLink></NavElement>
        </Nav>
    );
};

export default Navbar;
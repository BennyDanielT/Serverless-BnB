import React from "react";
import { Nav, NavElement, NavLink } from "./Navbar.style";
import {db} from '../../firebase';
import { collection, query, where, getDocs , addDoc, Timestamp ,updateDoc , doc} from "firebase/firestore";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  let docid = ""
  const navigate = useNavigate();

  const onLogout = async(event) =>{
    event.preventDefault();
    console.log(localStorage.getItem("email"))

    const q = query(collection(db, "user_stats")
    , where("email", "==", localStorage.getItem('email'))
    , where("logout", "==", "")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        docid = doc.id
    })
    const stats = doc(db, "user_stats", docid);

    await updateDoc(stats, {
      logout: new Date(Timestamp.now().seconds*1000)
    });
    localStorage.clear();
    navigate(`/loginui`);
  }

  return (
    <Nav className="Navbar">
      <NavElement className="NavbarElement">
        <NavLink href="book-rooms">Book Rooms</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href="order">Order Food</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href="notifications">Notifications</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href="tourBooking">Tour Booking</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href="reports">Reports</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href="visualizations">Visualization</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href="feedback">Feedback</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href="chat">Chat</NavLink>
      </NavElement>
      <NavElement>
        <NavLink onClick={onLogout}>Logout</NavLink>
      </NavElement>
      <NavElement>
        <NavLink href='chat'>Chat Support</NavLink>
      </NavElement>
    </Nav>
  );
};

export default Navbar;

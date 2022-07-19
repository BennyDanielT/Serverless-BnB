import Navbar from '../Navbar/Navbar';
import './room.css';
import { getRooms } from '../../services/Room/room.service';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Table } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Room from './room';

const BookRoom = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [minAmount, setMinAmount] = useState(0);
  const [minAdults, setMinAdults] = useState(0);
  const [minChild, setMinChild] = useState(0);
  const [roomsData, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const options = [
    { value: '', label: 'Choose a Room Type' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
  ];
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const getAvailableRooms = async () => {
    try {
      const roomsAPI = await getRooms();
      // const filteredtValues = roomsAPI.data.data.filter((value) => {
      //   let occupants = minAdults+minChild;
      //   return (
      //     value.is_available === 'true'
      //       &&
      //      value.capacity<=occupants);
      // });
      // setRooms(filteredtValues);
      setRooms(roomsAPI.data.data);
      setAllRooms(roomsAPI.data.data);
      // console.log(roomsAPI.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAvailableRooms();
    // updateData();
  }, []);
  console.log(roomsData);
  // console.log(typeof(roomsData[0].capacity));

  const updateData = () => {
    const filteredtValues = allRooms.filter((value) => {
      let occupants = parseInt(minAdults) + parseInt(minChild);
      console.log(occupants);
      return (
        value.is_available === 'true' &&
        value.capacity >= occupants &&
        value.type === selected
      );
    });
    setRooms(filteredtValues);
  };
  console.log(roomsData);

  return (
    <div>
      <Navbar />
      <div className='header-r'>
        <div className='info'>
          <h2>Welcome to our Bed 'N' Breakfast site</h2>
          <h3>
            Due to Summer hours, our room availabilities are low. Please find
            the available rooms below
          </h3>
        </div>
      </div>
      {/* <div className='mt-5 p-5 d-flex'> */}
      <div className='mt-2 pt-5 d-flex justify-content-center'>
        <Form className='block-example rounded border border-success'>
          <br></br>
          <div className='d-flex'>
            <div className='mx-auto'>
              <span>From</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className='mx-auto'>
              <div>To</div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <br></br>
          <div className='d-flex'>
            <div className='p-2'>
              <span>Room Type</span>
              <select value={selected} onChange={handleChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className='p-2 m-2'>
                <span>Number of Rooms</span>
                <br></br>
                {/* <input
                  id='number1'
                  type='number'
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                /> */}
            {/* </div> */}
          </div>
          <br></br>

          <div className='d-flex'>
            <div className='p-2 m-1'>
              <span>Number of Adults</span>
              <br></br>
              <input
                id='number1'
                type='number'
                value={minAdults}
                onChange={(e) => setMinAdults(e.target.value)}
              />
            </div>
            <div className='p-2 m-1'>
              <span>Number of Children</span>
              <br></br>
              <input
                id='number1'
                type='number'
                value={minChild}
                onChange={(e) => setMinChild(e.target.value)}
              />
            </div>
          </div>
          <br></br>
          <div className='d-flex justify-content-center'>
            <Button variant='primary' onClick={updateData}>
              Submit
            </Button>
          </div>
          <br></br>
        </Form>
      </div>

      <div className='mt-2 p-5 d-flex justify-content-end'>
        <main className='main-block main-col-2'>
          <div className='main-row'>
            {roomsData.map((room) => (
              <Room key={room.room_no} room={room}></Room>
            ))}
          </div>
        </main>
      </div>
      {/* </div> */}
    </div>
  );
};

export default BookRoom;

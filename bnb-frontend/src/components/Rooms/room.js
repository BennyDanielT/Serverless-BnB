import React from 'react';
import { Button } from 'react-bootstrap';
import './roomStyle.css';
import { reservation } from '../../services/Room/room.service';
export default function Room(props) {
  const { room } = props;
  const reservationRequest = {};

  // console.log(typeof room.available_on._seconds);
  // console.log(new Date(room.available_on._seconds));
  // console.log(roomsAPI.data.data);
  // console.log(availableDate);

  let availableDate = new Date(room.available_on._seconds * 1000);
  const bookThisRoom = async (rm) => {
    try {
      const bookRoomResponse = await reservation(reservationRequest);
      if (bookRoomResponse.success) {
        // navigate("/notifications");
      } else {
        alert('Order not placed, please retry');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <img className='item-img-small' src={room.image_url} alt=''></img>
      <h3>Room Number: {room.room_no}</h3>
      <h4>Room Type: {room.type}</h4>
      <h4>Price: ${room.price}</h4>
      <h4 key={room.room_no}>
        Available On: {availableDate.toLocaleString('en-US')}
      </h4>
      <h4>Capacity: {room.capacity}</h4>
      <div className='button-container'>
        <Button
          className='item-button'
          // variant='primary'
          size='sm'
          onClick={() => bookThisRoom(room)}
        >
          {' '}
          Book Now{' '}
        </Button>
      </div>
    </div>
  );
}

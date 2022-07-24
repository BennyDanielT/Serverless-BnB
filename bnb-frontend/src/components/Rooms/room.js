import React from 'react';
import { Button } from 'react-bootstrap';
import './roomStyle.css';
import { reservation } from '../../services/Room/room.service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function Room(props) {
  const { room, startDate, endDate, occupants, user } = props;
  const reservationRequest = {};

  // console.log(typeof room.available_on._seconds);
  // console.log(new Date(room.available_on._seconds));
  // console.log(roomsAPI.data.data);
  // console.log(availableDate);

  let availableDate = new Date(room.available_on._seconds * 1000);
  reservationRequest['roomNo'] = room.room_no;
  reservationRequest['price'] = room.price;
  reservationRequest['startDate'] = startDate;
  reservationRequest['endDate'] = endDate;
  reservationRequest['occupants'] = occupants;
  reservationRequest['userName'] = user;

  let navigate = useNavigate();
  const bookThisRoom = async () => {
    try {
      const bookRoomResponse = await reservation(reservationRequest);
      if (bookRoomResponse.success) {
        // bookRoomResponse.success;
        Swal.fire(
          'Reservation Processed!',
          'Your desired room has been booked successfully',
          'success',
        );
        navigate('/');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Your Reservation did not go through!',
          icon: 'error',
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Back',
          background: '#fff',
          backdrop:
            'rgba(0,0,123,0.4) url("https://i.imgur.com/G0kYfKL.gif") left top no-repeat',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <img className='room-item-img-small' src={room.image_url} alt=''></img>
      <h3>Room Number: {room.room_no}</h3>
      <h4>Room Type: {room.type}</h4>
      <h4>Price: ${room.price}</h4>
      {/* <h4 key={room.room_no}>
        Available On: {availableDate.toLocaleString('en-US')}
      </h4> */}
      <h4>Capacity: {room.capacity}</h4>
      <div className='room-button-container d-flex justify-content-center'>
        <Button
          className='room-item-button'
          // variant='primary'
          size='sm'
          onClick={() => bookThisRoom()}
        >
          {' '}
          Book Now{' '}
        </Button>
      </div>
    </div>
  );
}

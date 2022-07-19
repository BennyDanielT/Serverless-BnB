import axios from 'axios';
const roomURL =
  'https://us-central1-serverless-data-computing.cloudfunctions.net/rooms_availability';
const reservationURL =
  'https://us-central1-serverless-data-computing.cloudfunctions.net/BookRoom';
export const getRooms = async () => {
  return await axios.post(roomURL);
};

export const reservation = async (booking) => {
  const rawResponse = await fetch(reservationURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
};

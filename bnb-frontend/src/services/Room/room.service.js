import axios from 'axios';
const roomURL =
  'https://us-central1-serverless-data-computing.cloudfunctions.net/rooms_availability';
const notificationsUrl =
  'https://us-central1-serverless-data-computing.cloudfunctions.net/notificationsProvider';
export const getRooms = async () => {
  return await axios.post(roomURL);
};

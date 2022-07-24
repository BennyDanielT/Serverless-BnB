// /**
//  * Triggered from a message on a Cloud Pub/Sub topic.
//  *
//  * @param {!Object} event Event payload.
//  * @param {!Object} context Metadata for the event.
//  */

// {
// "roomNo": 703,
// "price": 125 ,
// "startDate": "16-12-2022",
// "endDate": "30-12-2022",
// "occupants": 9,
// "userName": "Danny"
// }


// exports.reservation = async (req, res) => {
//   cors(req, res, async () => {
//     const admin = require('firebase-admin');
//     const timestamp = require('unix-timestamp');
//     const uuid4 = require('uuidv4');

//     if (!admin.apps.length) {
//       admin.initializeApp({
//         credential: admin.credential.applicationDefault(),
//       });
//     } else {
//       admin.app(); // if already initialized, use that one
//     }

//     res.set('Access-Control-Allow-Origin', '*');
//     res.set('Access-Control-Allow-Methods', 'GET, POST');

//     console.log(req.body);

//     let requestData = req.body;
//     let reservationId = uuid4.uuid().toString();
//     let roomNo = requestData.roomNo;
//     let price = requestData.price;
//     let bookingDate = new Date().toLocaleString('en-US');
//     let startDate = requestData.startDate;
//     let endDate = requestData.endDate;
//     let profit = price * 1.25;
//     let occupants = requestData.occupants;
//     let userName = requestData.UserName;

//     let updateDocId = '';

//     const db = admin.firestore();
//     const roomsDB = db.collection('available_rooms');
//     const reservationsDB = db.collection('room_booking');
//     console.log('Start of Reservation Process');
//     const reservationObj = {};
//     // const request = JSON.parse(message);

//     reservationObj['reservationId'] = reservationId;
//     reservationObj['roomNo'] = roomNo;
//     reservationObj['price'] = price;
//     reservationObj['bookingDate'] = bookingDate;
//     reservationObj['startDate'] = startDate;
//     reservationObj['endDate'] = endDate;
//     reservationObj['profit'] = profit;
//     reservationObj['occupants'] = occupants;
//     reservationObj['userName'] = userName;

//     const snapshot = await roomsDB.where('room_no', '==', roomNo).get();
//     if (snapshot.empty) {
//       console.log('No matching documents.');
//       return;
//     }

//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//       updateDocId = doc.id;
//     });

//     await reservationsDB
//       .doc(reservationObj['reservationId'])
//       .set(reservationObj);

//     await roomsDB.doc(updateDocId).update({ is_available: 'false' });

//     console.log('end');

//     res.status(200).json({
//       success: true,
//       message: 'Room Reserved Successfully',
//     });
//   });
// };

import { useNavigate } from "react-router-dom";
  const navigate = useNavigate();
const loggedInUser = localStorage.getItem('email');
    console.log(loggedInUser);
    if(!loggedInUser){
       alert(' Login is Required for any purchase');
       navigate("/login");
    }
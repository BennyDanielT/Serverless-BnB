/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

exports.helloPubSub = async (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : 'err';
  console.log(message);
  if(message === 'err'){
    return res.status(400).send({ message: "Bad Request", success: false });
  }
    console.log("tours-booked Cloud Function Triggered!");

  const admin = require('firebase-admin');

  if(!admin.apps.length) {
    admin.initializeApp({
    credential: admin.credential.applicationDefault()
    });
  } else {
   admin.app();
  }

  const db = admin.firestore();
  const toursBookedDb =  db.collection('tours_booked');
  
  const { tourID, userID, total_people, tour_length, start_date, total_cost } = JSON.parse(message);
  console.log("Request body: " + JSON.stringify(message));
  console.log("tourID: " + tourID);
  console.log("userID: " + userID);
  console.log("total_people: " + total_people);
  console.log("tour_length: " + tour_length);
  console.log("start_date: " + start_date);
  console.log("total_cost: " + total_cost);
  try {
    if (tourID && userID && total_people && tour_length && start_date && total_cost) {
      const toursBookedData = {
        tourID: tourID,
        userID: userID,
        total_people: total_people,
        tour_length: tour_length,
        start_date: start_date,
        total_cost: total_cost
      };
      const addToursBookedData = toursBookedDb.doc();
      await addToursBookedData.set(toursBookedData).then(() => {
        console.log(
          "Booked tour package added in the Google Firestore database successfully!"
        );
      });
      return "Booked tour package uploaded successfully!";
    } else {
      return res.status(400).send({ message: "Bad Request", success: false });
    }
  } catch (error) {
    return "Internal server error!";
  }
};

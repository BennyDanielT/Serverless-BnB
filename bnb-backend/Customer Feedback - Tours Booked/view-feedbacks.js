const cors = require("cors")({ origin: true });

exports.ViewFeedbacks = async (req, res) => {
  cors(req, res, async () => {
    console.log("view-feedbacks Cloud Function Triggered!");
    const admin = require("firebase-admin");
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    } else {
      admin.app();
    }
    const db = admin.firestore();
    const feedbackDb = db.collection("customer_feedback");

    try {
      const feedbackColl = await feedbackDb.get();
      var allCustomerFeedbacks = feedbackColl.docs.map((doc) => doc.data());
      console.log("allCustomerFeedbacks: " + allCustomerFeedbacks);
      return res.status(200).send({
        message: "customer_feedback collection data retrieved successfully!",
        success: true,
        customerfeedbacks: allCustomerFeedbacks,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error!", success: false });
    }
  });
};

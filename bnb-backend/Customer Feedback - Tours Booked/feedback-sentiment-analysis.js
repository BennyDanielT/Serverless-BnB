const cors = require("cors")({ origin: true });

exports.CustomerFeedbackSentiment = async (req, res) => {
  cors(req, res, async () => {
    console.log("Cloud Function Triggered!");

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

    const { Email, Feedback } = req.body;
    console.log("Request body: " + req.body);
    console.log("Email: " + Email);
    console.log("Feedback: " + Feedback);
    try {
      if (Email && Feedback && Email.length > 0 && Feedback.length > 0) {
        const language = require("@google-cloud/language");
        const client = new language.LanguageServiceClient();
        const document = { content: Feedback, type: "PLAIN_TEXT" };
        console.log("Document data: " + document);
        const [result] = await client.analyzeSentiment({ document });
        const sentiment = result.documentSentiment;
        const sentimentScore = sentiment.score;
        const sentimentMagnitude = sentiment.magnitude;
        console.log("Score: " + sentimentScore);
        console.log("Magnitude: " + sentimentMagnitude);

        let polarity = "Neutral";
        if (sentimentScore > 0.25) polarity = "Positive";
        else if (sentimentScore < -0.25) polarity = "Negative";
        console.log("Polarity: " + polarity);

        const userFeedbackData = {
          Email: Email,
          Feedback: Feedback,
          Score: sentimentScore,
          Magnitude: sentimentMagnitude,
          Polarity: polarity,
        };
        const addCustomerFeedbackData = feedbackDb.doc(Email);
        await addCustomerFeedbackData.set(userFeedbackData).then(() => {
          console.log(
            "User Feedback added in the Google Firestore database with Sentiment Analysis successfully!"
          );
        });
        return res.status(200).send({
          message: "Customer feedback added successfully!",
          success: true,
          userFeedbackData: userFeedbackData,
        });
      } else {
        return res.status(400).send({ message: "Bad Request", success: false });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error!", success: false });
    }
  });
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const cors = require('cors')({origin: true});

exports.tourSearch = (req, res) => {
    cors(req, res, async () => {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST');

    const admin = require('firebase-admin');
    if(!admin.apps.length) {
        admin.initializeApp({
        credential: admin.credential.applicationDefault()
        });
    } else {
        admin.app();
    }

    const db = admin.firestore();
    const tours = await db.collection('tour_packages').get();
    var message = tours.docs.map(doc => doc.data());
    



    const aiplatform = require('@google-cloud/aiplatform');
    const {prediction} = aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

// Imports the Google Cloud Prediction service client
const {PredictionServiceClient} = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects.
const {helpers} = aiplatform;

// Specifies the location of the api endpoint

const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function predictTablesClassification() {
  // Configure the endpoint resource
  ENDPOINT_ID="1775605725741973504"
  PROJECT_ID="serverless-data-computing"
  INPUT_DATA_FILE="INPUT-JSON"
  const endpoint = `projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}`;
  const parameters = helpers.toValue({});

  const instance = helpers.toValue({
    total_people: String(JSON.parse(req.body)['total_people']),
    tour_length:String(JSON.parse(req.body)['tour_length']),
    sighseeing_preference:String(JSON.parse(req.body)['sighseeing_preference']),
    physicalActivity_preference:String(JSON.parse(req.body)['physicalActivity_preference']),
    expectedStartDate: '2020-09-01'
  });

  const instances = [instance];
  const request = {
    endpoint,
    instances,
    parameters,
  };

  // Predict request
  const [response] = await predictionServiceClient.predict(request);

  console.log('Predict tabular classification response');
  console.log(`\tDeployed model id : ${response.deployedModelId}\n`);
  const predictions = response.predictions;
  console.log('Predictions :');
  for (const predictionResultVal of predictions) {
    const predictionResultObj =
      prediction.TabularClassificationPredictionResult.fromValue(
        predictionResultVal
      );
    var order = [0]
    var score = [0]
    for (const [i, class_] of predictionResultObj.classes.entries()) {
      for(let j=0;j<score.length;j++){
          if(score[j] < predictionResultObj.scores[i]){
              score.splice(j, 0, predictionResultObj.scores[i])
              order.splice(j, 0, class_)
          }
      }
    }
  }
}
predictTablesClassification(message);
res.status(200).send(message);
   })
  
};

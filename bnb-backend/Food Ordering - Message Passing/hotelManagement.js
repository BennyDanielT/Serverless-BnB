const {PubSub} = require('@google-cloud/pubsub');
const cors = require('cors')({origin: true});
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

/*{
  "user_id" : "",
  "order": [
    {
      "item_id": "",
      "quantity":""
    },
    {
      "item_id" : "",
      "quantity":""
    }
  ]
  }
*/
exports.hotelManagement = async (req, res) => {
  cors(req, res, async () => {
      const pubSubClient = new PubSub();
      const bodyString =  JSON.stringify(req.body);
      const dataBuffer = Buffer.from(bodyString);
      try {
        if(req.body.order.length==0 || req.body.user_id.trim() === '') {
          res.status(400).json({"success":false,"message":"Order and User_ID must not be empty",data:req.body});
        }
        const messageId = await pubSubClient.topic("projects/serverless-data-computing/topics/kitchen")
                                            .publishMessage({data:dataBuffer});
        console.log(`Message ${messageId} published.`);
        res.status(200).json({"success":true,"message":"Message Published",data:req.body});
      } catch (err) {
        console.error(err);
        res.status(500).json({"success":false,"message":"Internal Server Error",data:req.body});
      }
  })
};

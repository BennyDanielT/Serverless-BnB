/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.helloPubSub = async (event, context) => {
  const admin = require('firebase-admin');
  const timestamp = require('unix-timestamp');
  const uuid4 = require('uuidv4');
  
  if (!admin.apps.length) {
    admin.initializeApp({
    credential: admin.credential.applicationDefault()
    });
  }else {
   admin.app(); // if already initialized, use that one
  }

  const db = admin.firestore();
  const notificationsDb =  db.collection('notifications');
  const ordersDb = db.collection('orders');
  const menuDb = db.collection('menu');
  console.log('Gearing Up Again');
   const message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : 'err';
	if(message==='err'){
		return;
	}
    const request = JSON.parse(message);
    const user_id = request['user_id'];
    const orders = request['order'];
    const consumerOrder = {};
    const orderList = [];
    consumerOrder['order_id'] = uuid4.uuid().toString();
    var maxAmountTillNow = 0;
    var totalCost = 0;
    
    for (index in orders) {
        const order = orders[index];
        var orderItemResponse = await menuDb.doc(order['item_id'].toString()).get();
        var orderItem =  orderItemResponse.data();
        totalCost = totalCost + (orderItem['selling_price'] * order.quantity);
        const remainingQuantity = orderItem['quantity'] - order['quantity'];
        console.log('remaning quantity is '+ remainingQuantity)
        await menuDb.doc(order['item_id'].toString()).update({'quantity':remainingQuantity}); 
        if (orderItem['preparing_time']> maxAmountTillNow) {
            maxAmountTillNow = orderItem['preparing_time'];
        }
        orderItem['quantity'] = order['quantity'];
        orderList.push(orderItem);
    }
    consumerOrder['user_id'] = user_id;
    consumerOrder['preparing_time'] = maxAmountTillNow;
    consumerOrder['bill_amount'] = totalCost;
    consumerOrder['items'] = orderList;
    var currentTimeStamp = timestamp.now();
    var preparingTimeStamp = timestamp.add(currentTimeStamp, maxAmountTillNow);
    consumerOrder['timestamp'] = currentTimeStamp;
    consumerOrder['waitTime'] = preparingTimeStamp;
    const res = await ordersDb.doc(consumerOrder['order_id']).set(consumerOrder);

};

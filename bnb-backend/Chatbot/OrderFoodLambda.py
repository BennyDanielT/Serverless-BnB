import json
import http.client
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


def close(session_attributes, fulfillment_state, message):
    response = {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': fulfillment_state,
            'message': message
        }
    }

    return response


def get_menu_items():
    conn = http.client.HTTPSConnection("us-central1-serverless-data-computing.cloudfunctions.net")
    conn.request('GET', 'https://us-central1-serverless-data-computing.cloudfunctions.net/menu')
    res = conn.getresponse()
    resp_data = res.read().decode("utf-8")
    print(resp_data)
    json_data = json.loads(resp_data)
    print(json_data, type(json_data))
    data = json_data['data']
    print(data)
    return data


def lambda_handler(event, context):
    logger.debug('event={}'.format(json.dumps(event)))
    print(json.dumps(event))
    session_attr = event['sessionAttributes']
    print("Session attr: " + json.dumps(session_attr))
    slots = event['currentIntent']['slots']
    if session_attr["username"] == "none":
        return close(event['sessionAttributes'],
                     'Failed',
                     {'contentType': 'PlainText',
                      'content': 'Please login to access the services.'})
    else:
        if "selected_items" in slots and "quantity" in slots:
            selected_items = slots['selected_items']
            quantity = slots['quantity']
            print(selected_items, quantity)
            menu_items = get_menu_items()
            price = 0
            time = 0
            item_id = 0
            for obj in menu_items:
                if selected_items.lower() == obj['item_name'].lower():
                    sp = obj['selling_price']
                    price = int(sp) * int(quantity)
                    print(sp, quantity, price)
                    time = round(obj['preparing_time'] / 60, 2)
                    item_id = obj['item_id']
            req = {
                "user_id": "ruchi_lambda_test",
                "order": [
                    {
                        "item_id": item_id,
                        "quantity": quantity
                    }
                ]
            }

            conn = http.client.HTTPSConnection("us-central1-serverless-data-computing.cloudfunctions.net")
            payload = json.dumps(req)
            headers = {
                'Content-Type': 'application/json'
            }
            conn.request("POST", "https://us-central1-serverless-data-computing.cloudfunctions.net/hotelManagement",
                         payload, headers)
            res = conn.getresponse()
            resp_data = res.read().decode("utf-8")
            if res.status == 200:
                print(type(resp_data))
                json_data = json.loads(resp_data)
                if json_data['success'] == True:
                    return close(event['sessionAttributes'],
                                 'Fulfilled',
                                 {'contentType': 'PlainText',
                                  'content': 'Thanks, your order for {} has been placed and will be ready in {} mins. The cost of your order is ${}.'.format(
                                      selected_items, time, price)})
            # return delegate(output_session_attributes, get_slots(intent_request))

            # Order the flowers, and rely on the goodbye message of the bot to define the message to the end user.
            # In a real bot, this would likely involve a call to a backend service.
            return close(event['sessionAttributes'],
                         'Fulfilled',
                         {'contentType': 'PlainText',
                          'content': 'Sorry your order could not be completed'})

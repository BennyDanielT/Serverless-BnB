import json
import http.client
import logging
from datetime import datetime

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


def get_available_rooms(capacity):
    conn = http.client.HTTPSConnection("us-central1-serverless-data-computing.cloudfunctions.net")
    try:
        conn.request("GET", "/rooms_availability")
        res = conn.getresponse()
        resp_data = res.read().decode("utf-8")
        print(resp_data)
        json_data = json.loads(resp_data)
        print(json_data, type(json_data))
        data = json_data['data']
        room_found = False
        for room in data:
            if room["is_available"] == "true" and room["capacity"] >= int(capacity):
                return room

        if room_found == False:
            return {}
    except Exception as e:
        print(e)
        return {}


def lambda_handler(event, context):
    logger.debug('event={}'.format(json.dumps(event)))
    print(json.dumps(event))
    session_attr = event['sessionAttributes']
    print("Session attr: " + json.dumps(session_attr))
    slots = event['currentIntent']['slots']
    logger.debug("slots : {}".format(slots))
    if session_attr["username"] == "none":
        return close(event['sessionAttributes'],
                     'Failed',
                     {'contentType': 'PlainText',
                      'content': 'Please login to access the services.'})
    else:
        if "occupants" in slots and "checkinDate" in slots and "checkoutDate" in slots:
            print("inside get available rooms")
            capacity = slots["occupants"]
            checkin_dt = slots["checkinDate"]
            checkin_dt = datetime.strptime(checkin_dt, "%Y-%m-%d").strftime("%d-%m-%Y")
            checkout_dt = slots["checkoutDate"]
            checkout_dt = datetime.strptime(checkout_dt, "%Y-%m-%d").strftime("%d-%m-%Y")
            print(capacity, checkin_dt, checkout_dt)
            room = get_available_rooms(capacity)
            if room:
                conn = http.client.HTTPSConnection("us-central1-serverless-data-computing.cloudfunctions.net")
                price = room["price"]
                room_no = room["room_no"]
                type = room["type"]
                req = {
                    "roomNo": room_no,
                    "price": price,
                    "startDate": checkin_dt,
                    "endDate": checkout_dt,
                    "occupants": capacity,
                    "userName": session_attr["username"]
                }
                payload = json.dumps(req)
                print(payload)
                headers = {
                    'Content-Type': 'application/json'
                }
                try:
                    conn.request("POST", "/BookHotelRooms", payload, headers)
                    res = conn.getresponse()
                    resp_data = res.read().decode("utf-8")
                    if res.status == 200:
                        print(resp_data)
                        json_data = json.loads(resp_data)
                        if json_data['success'] == True:
                            return close(event['sessionAttributes'],
                                         'Fulfilled',
                                         {'contentType': 'PlainText',
                                          'content': 'Thanks, your booking for room type {} has been confirmed from {} to {}. The total tariff you will be paying is ${}.'.format(
                                              type, checkin_dt, checkout_dt, price)})
                    # return delegate(output_session_attributes, get_slots(intent_request))

                    # Order the flowers, and rely on the goodbye message of the bot to define the message to the end user.
                    # In a real bot, this would likely involve a call to a backend service.
                    else:
                        logger.debug("inside else for no 200 resp")
                        return close(event['sessionAttributes'],
                                     'Fulfilled',
                                     {'contentType': 'PlainText',
                                      'content': 'Sorry your booking could not be processed. Please try again.'})
                except Exception as e:
                    logger.debug(e)
                    return close(event['sessionAttributes'],
                                 'Fulfilled',
                                 {'contentType': 'PlainText',
                                  'content': 'Sorry your booking could not be processed. Please try again.'})

            else:
                logger.debug("inside else for no room resp")
                return close(event['sessionAttributes'],
                             'Fulfilled',
                             {'contentType': 'PlainText',
                              'content': 'Sorry your booking could not be processed as we do not have any available rooms that match your requirements.'})
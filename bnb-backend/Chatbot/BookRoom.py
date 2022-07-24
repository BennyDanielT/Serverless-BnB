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
        user_email = session_attr["username"]
        if "noOfPeople" in slots and "duration" in slots and "startDate" in slots and "tourId" in slots:
            print("inside get available rooms")
            no_of_people = slots["noOfPeople"]
            duration = slots["duration"]
            start_date = slots["startDate"]
            tour_id = slots["tourId"]
            print(no_of_people, duration, start_date, tour_id)
            price_arr = [80, 550, 300]
            i = int(tour_id) - 1
            price = price_arr[i]
            tour_names = ["Halifax Hoppers", "Tall Ship Silva Sailing Cruise", "Peggy's Cove and Lunenberg"]
            tour_name = tour_names[i]
            try:
                conn = http.client.HTTPSConnection("us-central1-serverless-data-computing.cloudfunctions.net")
                payload = json.dumps({
                    "tourID": tour_id,
                    "userID": user_email,
                    "total_people": no_of_people,
                    "tour_length": duration,
                    "start_date": start_date,
                    "total_cost": "${}".format(price)
                })
                print(payload)
                headers = {
                    'Content-Type': 'application/json'
                }
                try:
                    conn.request("POST", "/tours-booked", payload, headers)
                    res = conn.getresponse()
                    resp_data = res.read().decode("utf-8")
                    if res.status == 200:
                        print(resp_data)
                        json_data = json.loads(resp_data)
                        if json_data['success'] == True:
                            return close(event['sessionAttributes'],
                                         'Fulfilled',
                                         {'contentType': 'PlainText',
                                          'content': 'Thanks, your booking for {} tour is confirmed for date {}. The total cost of your tour will be ${}'.format(
                                              tour_name, start_date, price)})
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

            except Exception as e:
                logger.debug(e)
                return close(event['sessionAttributes'],
                             'Fulfilled',
                             {'contentType': 'PlainText',
                              'content': 'Sorry your booking could not be processed as we do not have any available tours that match your requirements.'})
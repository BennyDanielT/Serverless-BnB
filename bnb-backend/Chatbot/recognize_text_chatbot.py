import json, boto3


def lambda_handler(event, context):
    print(event)
    body = json.loads(event['body'])
    print(type(body))
    json_body = json.loads(json.dumps(body))
    text = json_body['text']
    username = json_body['username']
    print(json_body, text)

    print(text)
    try:
        client = boto3.client('lex-runtime')
        response = client.post_text(
            botName='ServerlessBnB',
            botAlias='ServerlessChatbot',
            userId='AWSServiceRoleForLexBots',
            sessionAttributes={
                'username': username
            },
            inputText=text)
        print(response)
        resp_text = response['message']
        print(resp_text)
        return {"status": 200, "message": resp_text}
    except Exception as e:
        print(e)
        return {"status": 500, "message": "Sorry, I couldn't get that."}

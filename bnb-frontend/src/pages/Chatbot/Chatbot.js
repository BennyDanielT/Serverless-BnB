import { useState } from "react";
//import MessageContainer from "../../components/Chat/MessageContainer";
import { Button, Input, InputContainer } from "./Chatbot.style";
import axios from 'axios'

const Chatbot = (props) => {
    const [userMsg, setUserMsg] = useState('');
    const recognizeTextURL = "https://hjxhurkdvcenigh7alsy2kbywe0boipw.lambda-url.us-east-1.on.aws/";
    let msgHistory = []
    const handleInput = (e) => {
        e.preventDefault();
        console.log(userMsg);
        let userRequest = {
            "text": userMsg
        }
        let userReply = {"message":userRequest.text, "author": "You"}
        msgHistory.push(userReply);
        props.getNewResponse(userReply);
        axios.post(recognizeTextURL, userRequest).then(res => {
            let botResponse = {"message":res.data.message, "author": "Bot"}
            msgHistory.push(botResponse);
            console.log("Res"+res.data+" msg hist"+msgHistory);
           props.getNewResponse(botResponse);

        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <form>
            <InputContainer>
                <Input type="text" onChange={event => {
                    setUserMsg(event.target.value)
                    if (event.key === 'Enter') {
                        console.log('do validate');
                    }
                }}>
                </Input>
                <Button onClick={handleInput}>
                    Send
                </Button>
            </InputContainer>
        </form>
    )

}

export default Chatbot;
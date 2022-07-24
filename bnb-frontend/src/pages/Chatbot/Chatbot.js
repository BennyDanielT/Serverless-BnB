import { useState } from "react";
//import MessageContainer from "../../components/Chat/MessageContainer";
import { Button, HorizontalDivider, Input, InputContainer } from "./Chatbot.style";
import axios from 'axios'

const Chatbot = (props) => {
    const [userMsg, setUserMsg] = useState('');
    const recognizeTextURL = "https://hjxhurkdvcenigh7alsy2kbywe0boipw.lambda-url.us-east-1.on.aws/";
    let msgHistory = []
    const handleInput = (e) => {
        let userMsgCopy = userMsg;
        let email = localStorage.getItem("email");
        setUserMsg("");
        e.preventDefault();
        let userRequest = {
            "text": userMsgCopy,
            "username": email
        }
        let userReply = { "message": userRequest.text, "author": "You" }
        msgHistory.push(userReply);
        props.getNewResponse(userReply);
        axios.post(recognizeTextURL, userRequest).then(res => {
            let botResponse = { "message": res.data.message, "author": "Bot" }
            msgHistory.push(botResponse);
            props.getNewResponse(botResponse);

        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <form>
            <InputContainer>
                <Input type="text" value={userMsg} onChange={event => {
                    setUserMsg(event.target.value);
                }}>
                </Input>
                <HorizontalDivider />
                <Button onClick={handleInput}>
                    Send
                </Button>
            </InputContainer>
        </form>
    )

}

export default Chatbot;
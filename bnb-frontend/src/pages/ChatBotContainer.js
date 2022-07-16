
import React from "react";
import Chatbot from "./Chatbot/Chatbot";

class ChatBotContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.processNewResponse = this.processNewResponse.bind(this);
      }

      processNewResponse(newResponse) {
        const { messages } = this.state;
        let msgCopy = messages;
        msgCopy.push(newResponse);
        this.setState({messages: msgCopy});
      }
       

    render() {
        console.log(this.state.messages);
      return (
        <div>
            {
                this.state?.messages.map((message, i) => (
                    <div>
                        <span className="author" key={i}>{message.author}:</span>
                        {message.message}
                    </div>
                ))
            }
            <Chatbot getNewResponse={this.processNewResponse} />
        </div>
        );
    }
  }

export default ChatBotContainer;
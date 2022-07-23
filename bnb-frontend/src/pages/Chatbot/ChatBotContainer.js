
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Chatbot from "./Chatbot";
import { ChatBubble, ChatBotWrapper, Divider } from "./ChatBotContainer.style";

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
    this.setState({ messages: msgCopy });
  }


  render() {
    console.log(this.state.messages);
    return (
      <div>
        <Navbar />
        <ChatBotWrapper>
          {
            this.state?.messages.map((message, i) => (
              <div>
                <ChatBubble>
                  <span className="author" key={i}>{message.author}: </span>
                  {message.message}
                </ChatBubble>
                <Divider></Divider>
              </div>
            ))
          }
        </ChatBotWrapper>

        <Chatbot getNewResponse={this.processNewResponse} />
      </div>
    );
  }
}

export default ChatBotContainer;
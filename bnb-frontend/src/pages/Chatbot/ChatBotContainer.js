
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Chatbot from "./Chatbot";
import { Navigate } from "react-router-dom";
import { useRef } from "react";
import { ChatBubble, ChatBotWrapper, Divider, FlexWrapper, Messages } from "./ChatBotContainer.style";

class ChatBotContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.processNewResponse = this.processNewResponse.bind(this);
    this.scrollRef = React.createRef();
  }

  // componentDidMount() {
  //   if(localStorage.getItem("email") !== ""){
  //     <Navigate to="/loginui" replace={true} />
  //   }
  // }

  processNewResponse(newResponse) {
    const { messages } = this.state;
    let msgCopy = messages;
    msgCopy.push(newResponse);
    this.setState({ messages: msgCopy });
  }
  
  executeScroll = () => this.scrollRef.current.scrollIntoView();

  componentDidUpdate(prevProps, prevState) {
    this.executeScroll();
  }

  render() {
    const { messages } = this.state;
    return (
      <FlexWrapper>
        <Navbar />
        <ChatBotWrapper>
          {
            messages.map((message, i) => (
              <div>
                <ChatBubble ref={ i === messages.length - 1 && this.scrollRef}>
                {/* <ChatBubble> */}
                  <span className="author" key={i}>{message.author}: </span>
                  {message.message}
                </ChatBubble>
                <Divider></Divider>
              </div>
            ))
          }
        </ChatBotWrapper>

        <Chatbot getNewResponse={this.processNewResponse} />
      </FlexWrapper>
    );
  }
}

export default ChatBotContainer;
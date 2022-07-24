import styled from 'styled-components';

const ChatBubble = styled.div`
position: relative;
padding: 15px;
border-radius: 10px;
max-width: 70%;
background: lavender;
margin: 8px;
`;


const ChatBotWrapper = styled.div`
    height: calc(100% - 148px);
    overflow-y: auto;
    scroll-behavior: smooth;
`;

const Divider = styled.div`
padding: 5px;
`;

const FlexWrapper = styled.div`
    flex-direction: column;
    height: 100vh;
`;
const Messages = styled.div`
    height: calc(100% - 88px);
`;

export {ChatBotWrapper, ChatBubble, Divider, FlexWrapper, Messages}

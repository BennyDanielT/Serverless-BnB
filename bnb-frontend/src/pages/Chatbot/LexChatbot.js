import LexChat from "react-lex-plus";
import AWS from 'aws-sdk';


const LexChatbot = () => {
  AWS.config.region = 'us-east-1'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:0d538a41-7311-44d9-ad72-b9533ee30ffc',
  });
     
      let lexruntime = new AWS.LexRuntime();

    return (
        <LexChat botName="ServerlessBnB"
            IdentityPoolId="us-east-1:0d538a41-7311-44d9-ad72-b9533ee30ffc"
            placeholder="Please type your input here"
            style={{ position: 'absolute' }}
            backgroundColor="#FFFFFF"
            height="430px"
            region="us-east-1"
            headerText="Chat with our ServerlessBnB bot" />

    );
}

export default LexChatbot;
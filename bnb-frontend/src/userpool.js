import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:"us-east-1_qaAqyvegz",
    ClientId:"44jabo9tpbkjhgqs79ep533p87"
}

export default new CognitoUserPool(poolData);
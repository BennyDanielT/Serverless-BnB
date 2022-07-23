import React,{useState} from "react";
import userpool from "../userpool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {db} from '../firebase';
import { collection, query, where, getDocs , addDoc, Timestamp } from "firebase/firestore";
import axios from 'axios';
import { async } from "@firebase/util";
import {useNavigate} from 'react-router-dom';
const Login = () =>{
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onSubmit = (event) =>{
        event.preventDefault();
        localStorage.setItem("email",email);
        const user = new CognitoUser({
            Username: email,
            Pool: userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails,{
            onSuccess: (data) => {
                console.log("onsuccess : ",data);
                navigate(`/qna_cipher`);
            },
            onFailure: (err) =>{
                alert("onfailure : ",err);
            },
            newPasswordRequired:(data) =>{
                alert("newpasswordrequired", data);
            }
        })
        
    }

    return ( 
        <div>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <br></br>
                <label>password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
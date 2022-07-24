import React,{useState} from "react";
import userpool from "../userpool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {db} from '../firebase';
import { collection, query, where, getDocs , addDoc, Timestamp } from "firebase/firestore";
import axios from 'axios';
import { async } from "@firebase/util";
import {useNavigate} from 'react-router-dom';
import "./style.css";

const Loginui = () =>{
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
                navigate(`/qna_cipherui`);
            },
            onFailure: (err) =>{
                alert(err);
            },
            newPasswordRequired:(data) =>{
                alert("newpasswordrequired", data);
            }
        })
    }

    return (  
        <div className="app">
            <label>Serverless BnB Login</label>
        <div className="login-form">
        <form onSubmit={onSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
      </div>
    );
};

export default Loginui;
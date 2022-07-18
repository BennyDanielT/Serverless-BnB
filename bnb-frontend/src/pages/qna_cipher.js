import userpool from "../userpool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {db} from '../firebase';
import { collection, query, where, getDocs , addDoc, Timestamp } from "firebase/firestore";
import axios from 'axios';
import { async } from "@firebase/util";
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react'

const Qna_cipher = () => {
    const [email,setEmail] = useState("");
    const [question,setQuestion] = useState('')
    const [answer,setAnswer] = useState('')
    const [useranswer,setUseranswer] = useState('')
    const [userCipher,setUserCipher] = useState('')
    const [plaintext,setPlaintext] = useState('')
    const [verifycipher,setVerifycipher] = useState('')
    let x = ""

    const getQuestion = async(event) => {
        event.preventDefault();
        const q = query(collection(db, "user_details"), where("email", "==", localStorage.getItem('email')));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setQuestion(doc.data()['question']);
            setAnswer(doc.data()['answer']);
        });
    };

    const onSubmit = async(event) =>{
        event.preventDefault();     
        await checkCipher()
        if(answer===useranswer){
            console.log(verifycipher)
            if(x==="true")
            {
                console.log(question)
                console.log(answer)
                alert("Security check pass")
            }
            else{
                alert("Cipher security check fails , Please enter correct cipher text")
            }
        }   
        else{
            alert("Security answer is incorrect , Answer is case sensitive")
        }
    }

    const checkCipher = async(event) => {
        console.log(userCipher)
        const headers = {
            "Content-Type": "text/json"
        };
        const data = {
            plaintext: plaintext,
            userciphertext: userCipher,
            email: localStorage.getItem('email')
        };
        let url = "https://gwq4vu6wiidbtpjyj3rt5lule40npjcm.lambda-url.us-east-1.on.aws/ciphercheck";
        await axios.post(url,data, {
            headers: headers
        })
        .then((response) => {
            setVerifycipher(response.data);
            x= response.data.toString();
            console.log(x)
        }, (error) => {
          console.error(error);
        });
    };

    const generatePlainText = async(event) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = 9;
        for ( var i = 0; i < 10; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       setPlaintext(result)
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Security Question</label>
                <div>{question} ?</div>
                <input onChange={(event) => setUseranswer(event.target.value)}></input>
                <br></br>
                <button onClick={getQuestion} type="button">Get Question</button>
                <br></br>
                <button onClick={generatePlainText} type="button">Get plain text</button>
                <br></br>
                <div>{plaintext}</div>
                <label>Enter Cipher Text </label>
                <input onChange={(event) => setUserCipher(event.target.value)}></input>
                <br></br>
                <button type="submit">Submit MFA</button>
            </form>
        </div>
    );
};

export default Qna_cipher;
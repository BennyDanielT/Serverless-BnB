import React,{useState} from "react";
import userpool from "../userpool";
import {db} from '../firebase';
import { collection, query, where, getDocs , addDoc, Timestamp } from "firebase/firestore";
import axios from 'axios';
import { async } from "@firebase/util";
import {useNavigate} from 'react-router-dom';

const Registrationui = () =>{
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [answer,setAnswer] = useState("");
    const [Firstname,setFirstname] = useState("");
    const [Lastname,setLastname] = useState("");
    const [age,setAge] = useState("");
    const [value, setValue] = React.useState('Favourite Singer');
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const [num, setNum] = useState(0);

    function randomNumberInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const headers = {
      "Content-Type": "text/json"
  };  
  
    const generateKey = () => {
      setNum(randomNumberInRange(1, 26));
    };

    const storeUserDetails =async() =>{
      let firebaseurl = "https://us-central1-serverless-data-computing.cloudfunctions.net/user_details_ops"
      const data = {
        email: email,
        firstname: Firstname,
        lastname: Lastname,
        age: age,
        question: value,
        answer: answer,
        message: "parikh"
      }
      console.log(data)
      await axios.post(firebaseurl, data)
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.error(error);
      });
    }
    
    const onSubmit = async(event) =>{
        if(num === 0){
            alert("Please click on generate key to generate cipher key");
        }
        else{
        event.preventDefault();
        storeUserDetails()
        userpool.signUp(email,password,[],null,async(err,data) => {
            if(err){
                console.error(err);
                alert(err)
            }
            else{
                try {
                  const data = {
                      email: email,
                      key: num
                  };
                  let url = "https://gwq4vu6wiidbtpjyj3rt5lule40npjcm.lambda-url.us-east-1.on.aws/";
                  await axios.post(url,data, {
                      headers: headers
                  })
                  .then((response) => {
                    console.log(response);
                  }, (error) => {
                    console.error(error);
                  });
                  navigate(`/loginui`);
                  } 
                  catch (err) {
                    alert(err)
                  }
            }
            console.log(data);
        })
    }
    }

    const getdetails = async(event) =>{     
        const q = query(collection(db, "user_details"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data()['answer']);
        });
    }

    return ( 
    <div className="app">
        <label>Serverless BnB Registration</label>
        <div className="login-form">
        <form onSubmit={onSubmit}>
        <div className="input-container">
                <label>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
        </div>
        <div className="input-container">
                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        </div>
        <div className="input-container">
                <label>First Name</label>
                <input onChange={(event) => setFirstname(event.target.value)}></input>
        </div>
        <div className="input-container">
                <label>Last Name</label>
                <input  onChange={(event) => setLastname(event.target.value)}></input>
        </div>
        <div className="input-container">
                <label>Age</label>
                <input  onChange={(event) => setAge(event.target.value)}></input>
        </div>
        <div className="input-container">
                <div>
                <label>
                    Select Security Question
                    <br></br>
                    <select value={value} onChange={handleChange}>
                    <option value="Favourite Singer">Favourite Singer</option>
                    <option value="First School Name">First School Name</option>
                    <option value="Birth Place">Birth Place</option>
                    </select>
                </label>
                </div>
        </div>
        <div className="input-container">
                <label>Security Answer</label>
                <input  onChange={(event) => setAnswer(event.target.value)}></input>
        </div>
        <div className="input-container">
                <button onClick={generateKey} type="button">Generate Cipher Key</button>
        </div>
                <div>{num}</div>
                <button type="submit">Register</button>
        </form>
        <br></br>
        </div>
      </div>
    );
};

export default Registrationui;
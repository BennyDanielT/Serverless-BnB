import React,{useState} from "react";
import userpool from "../userpool";
import {db} from '../firebase';
import { collection, query, where, getDocs , addDoc, Timestamp } from "firebase/firestore";
import axios from 'axios';
import { async } from "@firebase/util";
import {useNavigate} from 'react-router-dom';

const Registration = () =>{
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
  
    const generateKey = () => {
      setNum(randomNumberInRange(1, 26));
    };
    
    const onSubmit = async(event) =>{
        if(num === 0){
            alert("Please click on generate key to generate cipher key");
        }
        else{
        event.preventDefault();
        userpool.signUp(email,password,[],null,async(err,data) => {
            if(err){
                console.error(err);
                alert(err)
            }
            else{
                try {
                    await addDoc(collection(db,'user_details'),{
                      email: email,
                      firstname: Firstname,
                      lastname: Lastname,
                      age: age,
                      question: value,
                      answer: answer
                    });
                    const headers = {
                        "Content-Type": "text/json"
                    };
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
                    navigate(`/login`);
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
        <div>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <br></br>
                <label>password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <br></br>
                <label>First Name</label>
                <input onChange={(event) => setFirstname(event.target.value)}></input>
                <br></br>
                <label>Last Name</label>
                <input  onChange={(event) => setLastname(event.target.value)}></input>
                <br></br>
                <label>Age</label>
                <input  onChange={(event) => setAge(event.target.value)}></input>
                <br></br>
                <div>
                <label>
                    Select Security Question
                    <select value={value} onChange={handleChange}>
                    <option value="Favourite Singer">Favourite Singer</option>
                    <option value="First School Name">First School Name</option>
                    <option value="Birth Place">Birth Place</option>
                    </select>
                </label>
                </div>
                <label>Security Answer</label>
                <input  onChange={(event) => setAnswer(event.target.value)}></input>
                <br></br>
                <button onClick={generateKey} type="button">Generate Cipher Key</button>
                <br></br>
                <div>{num}</div>
                <button type="submit">Register</button>
            </form>
            <br></br>
            <button onClick={getdetails} type="button">Generate Cipher Key</button>
                
        </div>
    );
};

export default Registration;
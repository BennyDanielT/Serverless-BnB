import userpool from "../userpool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {db} from '../firebase';
import { collection, query, where, getDocs , addDoc, Timestamp  } from "firebase/firestore";
import axios from 'axios';
import { async } from "@firebase/util";
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import "./style.css";
import Navbar from "../components/Navbar/Navbar";
import timestampProvider, { toDate } from "unix-timestamp";
import { Watch } from "react-loader-spinner";
import { Button, Table } from "react-bootstrap";
import Login from "./login";

const Reports = () => {
    const [loading, setLoading] = useState(true);
    let [myArray, setMyArray] = useState([]);
    let firebaseurl = "https://us-central1-serverless-data-computing.cloudfunctions.net/stat_test"
    let firebasedata = {
      email: localStorage.getItem("email")
    }

    const renderStatsData = () => {
        return myArray.map((x,index) => {
            let login = toDate(x.login._seconds).toLocaleString()
            let logout = x.logout
            if(logout!==""){
                logout = toDate(x.logout._seconds).toLocaleString()
            }
          return (
            <tr>
              <td>{index+1}</td>
              <td>{login}</td>
              <td>{logout}</td>
            </tr>
          );
        });
      };

    useEffect(() => {
        const getDataFromStatsApi = async () => {
          try {
            await axios.post(firebaseurl,firebasedata, {
                headers: null
              })
            .then((response) => {
                console.log(response.data.data)
                setMyArray(response.data.data)
            }, (error) => {
              console.error(error);
            });
          } catch (error) {
            console.log(error.message);
          }
        };
        getDataFromStatsApi();
      }, []);

    const getQuestion = async(event) => {
        console.log(firebasedata)
        console.log(firebaseurl)
        await axios.post(firebaseurl,firebasedata, {
            headers: null
          })
        .then((response) => {
            console.log(response.data.data)
            setMyArray(response.data.data)
        }, (error) => {
          console.error(error);
        });
    };

    return (
        <div >
        <Navbar />

        <div>
        {loading && (
       <div className="loader">  </div>
      )}
          <Table
            striped
            bordered
            hover
            size="sm"
            className="notifications-table"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>login</th>
                <th>logout</th>
              </tr>
            </thead>
            <tbody>{renderStatsData()}</tbody>
          </Table>
        </div>
        </div>
    );
};

export default Reports;
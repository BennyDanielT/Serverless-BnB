import React, { useState, useEffect } from "react";
import timestampProvider from "unix-timestamp";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, Table } from "react-bootstrap";
import "./notifications.css";
import { getNotifications } from "../../../services/Menu/kitchen.service";
import Navbar from "../../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import { Watch } from "react-loader-spinner";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [currentUser, setCurrentUser] = useState("");
  const parseOrderStatus = (waitTime) => {
    const currentTimeStamp = timestampProvider.now();
    if (currentTimeStamp < waitTime) {
      return "PREPARING";
    } else {
      return "READY";
    }
  };

  const exportPDF = async (event) => {
    event.preventDefault();
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "B&B Food Orders Invoice";
    const headers = [["Bill Amount", "Order", "Date"]];

    const data = notifications.map((elt) => [
      elt.bill_amount,
      formatOrderString(elt.items),
      timestampProvider.toDate(elt.timestamp).toDateString(),
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("invoice.pdf");
  };

  const formatOrderString = (items) => {
    var orderString = "";
    for (var index = 0; index < items.length; index++) {
      const item = items[index];
      const itemString = `${item.quantity} x ${item.item_name} `;
      orderString = orderString.concat(itemString);
    }
    return orderString;
  };

  const renderNotificationsData = () => {
    return notifications.map((notification, index) => {
      const {
        bill_amount,
        items,
        order_id,
        preparing_time,
        timestamp,
        waitTime,
      } = notification;
      return (
        <tr key={order_id}>
          <td>{index + 1}</td>
          <td>{parseOrderStatus(waitTime)}</td>
          <td>{bill_amount.toString().concat(" $")}</td>
          <td>{formatOrderString(items)}</td>
          <td>{timestampProvider.toDate(timestamp).toDateString()}</td>
          <td>{(preparing_time / 60).toString().concat(" Minutes")}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const getDataFromNotificationsApi = async () => {
      try {
        const loggedInUser = localStorage.getItem('email');
        console.log(loggedInUser);
        if(!loggedInUser) {
          alert('Please login to view notifications');
          navigate("/login");
        }

        const user = loggedInUser;
        // setCurrentUser(user);
        //JSON.parse(localStorage.getItem('user_id'));
        const notificationsFromApi = await getNotifications(user);
        setNotifications(notificationsFromApi.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataFromNotificationsApi();
  }, []);

  return (
    <>
     
      <Navbar />
      <div className="notifications-container">
        <h3 className="title">notifications</h3>
        <div className="notifications-header">
          <Button variant="dark" onClick={exportPDF}>
            Download Invoice
          </Button>
        </div>
        <div className="notifications-table-container">
        {loading && (
       <div className="loader"> <Watch height="100" width="100" color="grey" ariaLabel="loading"  /> </div>
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
                <th>Status</th>
                <th>Amount</th>
                <th>Order Items</th>
                <th>Date</th>
                <th>Preparation Time</th>
              </tr>
            </thead>
            <tbody>{renderNotificationsData()}</tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Notifications;

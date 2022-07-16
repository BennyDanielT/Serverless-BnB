import axios from "axios";
const menuUrl = "https://us-central1-serverless-data-computing.cloudfunctions.net/menu";
const orderUrl = "http://us-central1-serverless-data-computing.cloudfunctions.net/hotelManagement";
const notificationsUrl = "https://us-central1-serverless-data-computing.cloudfunctions.net/notificationsProvider";
export const getMenuItems = async() => {
    return await axios.post(menuUrl);
}

export const orderItems = async(order) => {
    const rawResponse = await fetch(orderUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
    const content = await rawResponse.json();
    console.log(content)
    return content;
}

export const getNotifications = async(userId) => {
    const rawResponse = await fetch(notificationsUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user_id":userId})
      });
    const content = await rawResponse.json();
    console.log(content)
    return content;   
}
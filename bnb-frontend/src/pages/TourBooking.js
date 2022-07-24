import * as React from 'react';
import Navbar from './../components/Navbar/Navbar'
import axios from 'axios';



function TourBooking() {

    var totalPeople = React.useRef(0);
    var tourLength = React.useRef(0);
    var spreference = React.useRef(0);
    var papreference = React.useRef(0);
    var startDate = React.useRef(new Date());

    function setPeople(event){
        totalPeople.current = event.target.value;
    }

    function setLength(event){
        tourLength.current = event.target.value;
    }

    function setSpreference(event){
        spreference.current = event.target.value;
    }

    function setPapreference(event){
        papreference.current = event.target.value;
    }

    function setDate(event){
        startDate.current = new Date(event.target.value);
    }

    function sendData(){
        console.log('in test')
        axios.get('https://us-central1-serverless-data-computing.cloudfunctions.net/tourBooking', {params: {total_people:totalPeople.current,
         tour_length:tourLength.current, sighseeing_preference: spreference.current,physicalActivity_preference:papreference.current,
         expectedStartDate: startDate.current}}).then( res => {
            const data = res.data;
            var table = document.getElementById("tournamentTable");
            while(table.rows.length > 1){
                table.deleteRow(table.rows.length-1);
            }
            for(let index in data){
                var row = table.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                cell1.innerHTML = data[index]['id']
                cell2.innerHTML = data[index]['tour length']
                cell2.setAttribute('id','length-'+data[index]['id']);
                cell3.innerHTML = data[index]['tour details']
                cell4.innerHTML = data[index]['price']
                cell4.setAttribute('id','price-'+data[index]['id']);
                const btn = document.createElement('button');
                btn.setAttribute('id', data[index]['id'])
                btn.innerHTML = 'Book Tour';
                btn.addEventListener('click', bookTour);
                cell5.append(btn);
            }
         }).catch( err => {
             console.log(err);
         });
    }

    function bookTour(event){
        const user = localStorage.getItem('email');
        console.log(event.target.id)
        axios.post('https://us-central1-serverless-data-computing.cloudfunctions.net/tours-booked', 
           {tourID: event.target.id, userID: user, total_people: totalPeople.current, tour_length: document.getElementById('length-'+event.target.id).innerHTML, start_date: startDate.current, total_cost: document.getElementById('price-'+event.target.id).innerHTML}
          ).then(res => {
              alert('Tour has been successfully booked');
          }).catch(err =>{console.log(err)});

    }

  return (
    <div className="App">
      <Navbar />
      <br></br>
      <label>Total People: </label> <input onChange={setPeople}></input><br></br><br></br>
      <label>Length of tour: </label> <input onChange={setLength}></input><br></br><br></br>
      <label>Sight seeing preference (1 is highest): </label> 
      <select onChange={setSpreference}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4">5</option>
      </select><br></br><br></br>
      <label>Physical acitivities preference (1 is highest):</label> 
      <select onChange={setPapreference}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4">5</option>
      </select><br></br><br></br>
      <label>expected start date</label> <input type='date' min={new Date().toISOString().split('T')[0]} onChange={setDate}></input><br></br><br></br>
      <button onClick={sendData}>Search</button>
      <br></br><br></br>
      <table id="tournamentTable" style={{borderStyle:'solid', alignContent:'center', width:"100%"}}>
          	<tr style={{borderStyle:'solid'}}>
                <th>Tour ID</th>
                <th>Tour length</th>
                <th>Tour details</th>
                <th>Tour price</th>
                <th>Book Tour</th>
            </tr>
            <tbody>

            </tbody>
      </table>

    </div>
  );
}

export default TourBooking;

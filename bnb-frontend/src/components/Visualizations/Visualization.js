import Navbar from '../Navbar/Navbar';
import './viz.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Visualization = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('email');
  console.log(loggedInUser);
  if (!loggedInUser) {
    Swal.fire(
      'Please Login!',
      'Only registered members can view visualizations and previous bookings!',
      'error',
    );
    navigate('/loginui');
  }

  if (loggedInUser) {
    return (
      <div>
        <Navbar />
        <div className='viz-header'>
          <div className='viz-info'>
            <h2>Welcome to the Visualizations Page</h2>
            <h3>Here're some interesting charts for your perusal!</h3>
          </div>
        </div>

        <iframe
          className='iframe'
          width='100%'
          height='920'
          src='https://datastudio.google.com/embed/reporting/5078cfe8-15f4-4cfd-befd-12e87f04b258/page/kb1xC'
          allowfullscreen
        ></iframe>
      </div>
    );
  }
};

export default Visualization;

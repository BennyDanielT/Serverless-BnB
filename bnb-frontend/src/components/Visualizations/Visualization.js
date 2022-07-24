import Navbar from '../Navbar/Navbar';
import './viz.css';
const Visualization = () => {
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
};

export default Visualization;

import './App.css';
import { Router, Routes, Route } from "react-router-dom";
import OrderFood from './pages/OrderFood'
import Home from './pages/Home'



function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* <Route path="/home" element={<Home />} />
    //     <Route path='/orderFood' element={<OrderFood />} /> */}
    //     {/* <Route path='/bookRoom' component={OrderFOod} />
    //     <Route path='/tourBooking' component={TourBooking} />
    //     <Route path='/reports' component={Reports} />
    //     <Route path='/visualization' component={Visualization} /> */}
    //   </Routes>
    // </Router>
    <Home/>
  );
}

export default App;

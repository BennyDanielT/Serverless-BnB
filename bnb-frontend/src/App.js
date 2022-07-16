import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ChatBotContainer from './pages/ChatBotContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu/Menu';
import Notifications from './components/Menu/Notifications/Notifications';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBotContainer />} />
        <Route path="/order" element={<Menu />} />
        <Route path="/notifications" element={<Notifications/>}/>
      </Routes>
    </Router>
  );
}

export default App;

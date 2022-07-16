import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ChatBotContainer from './pages/ChatBotContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBotContainer />} />
      </Routes>
    </Router>
  );
}

export default App;

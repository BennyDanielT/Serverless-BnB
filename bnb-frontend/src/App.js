import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import ChatBotContainer from './pages/ChatBotContainer';
import Registration from './pages/Registration'
import Login from './pages/login';
import Qna_cipher from './pages/qna_cipher'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBotContainer />} />
        <Route path="/qna_cipher" element={<Qna_cipher />} />
      </Routes>
    </Router>
  );
}

export default App;

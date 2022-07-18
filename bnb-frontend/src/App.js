import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatBotContainer from './pages/ChatBotContainer';
import Registration from './pages/Registration'
import Login from './pages/login';
import Qna_cipher from './pages/qna_cipher'

import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu/Menu';
import Notifications from './components/Menu/Notifications/Notifications';
import BookRoom from './components/Rooms/BookRoom';
import Visualization from './components/Visualizations/Visualization';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBotContainer />} />
        <Route path="/qna_cipher" element={<Qna_cipher />} />
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<ChatBotContainer />} />
        <Route path='/order' element={<Menu />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/book-rooms' element={<BookRoom />} />
        <Route path='/visualizations' element={<Visualization />} />
      </Routes>
    </Router>
  );
}

export default App;

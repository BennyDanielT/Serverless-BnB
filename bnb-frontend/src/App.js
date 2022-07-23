import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatBotContainer from './pages/Chatbot/ChatBotContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu/Menu';
import Notifications from './components/Menu/Notifications/Notifications';
import BookRoom from './components/Rooms/BookRoom';
import Visualization from './components/Visualizations/Visualization';
import LexChatbot from './pages/Chatbot/LexChatbot';
function App() {
  return (
    <Router>
      <Routes>
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

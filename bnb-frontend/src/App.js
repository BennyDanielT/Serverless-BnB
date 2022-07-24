import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatBotContainer from "./pages/Chatbot/ChatBotContainer";
import Registration from "./pages/Registration";
import Registrationui from "./pages/Registrationui";
import Login from "./pages/login";
import Loginui from "./pages/loginui";
import Qna_cipher from "./pages/qna_cipher";
import Qna_cipher_ui from "./pages/qna_cipher_ui";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu/Menu";
import Notifications from "./components/Menu/Notifications/Notifications";
import BookRoom from "./components/Rooms/BookRoom";
import Visualization from "./components/Visualizations/Visualization";
import AddFeedback from "./pages/CustomerFeedback/AddFeedback";
import Reports from "./pages/Reports";
import ViewFeedback from "./pages/CustomerFeedback/ViewFeedback";
import TourBooking from "./pages/TourBooking";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/registerui" element={<Registrationui />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginui" element={<Loginui />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBotContainer />} />
        <Route path="/qna_cipher" element={<Qna_cipher />} />
        <Route path="/qna_cipherui" element={<Qna_cipher_ui />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBotContainer />} />
        <Route path="/order" element={<Menu />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/book-rooms" element={<BookRoom />} />
        <Route path="/visualizations" element={<Visualization />} />
        <Route path="/feedback" element={<AddFeedback />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/viewfeedbacks" element={<ViewFeedback />} />
        <Route path="/tourBooking" element={<TourBooking />} />
      </Routes>
    </Router>
  );
}

export default App;

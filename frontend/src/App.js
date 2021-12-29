import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeView from './views/HomeView/HomeView';
import ContactFormView from './views/contactFormView/ContactFormView';
import LoginFormView from './views/loginFormView/LoginFormView';
import ErrorView from './views/errorView/ErrorView';
import RegistrationView from './views/registrationView/RegistrationView';
import ProfileView from './views/profileView/ProfileView';
import FullProfileView from './views/fullProfile/FullProfileView';

// Change the display width by removing the --fluid after the container class
const App = () => {
  return (
    <Router>
      <div className="container--fluid">
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomeView />} exact />
            <Route path="/profile" element={<ProfileView />} exact />
            <Route path="/fullProfile" element={<FullProfileView />} exact />
            <Route path="/contact" element={<ContactFormView />} />
            <Route path="/login" element={<LoginFormView />} />
            <Route path="/registration" element={<RegistrationView />} />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeView from './views/HomeView/HomeView';
import ContactFormView from './views/contactFormView/ContactFormView';
import ErrorView from './views/errorView/ErrorView';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomeView />} exact />
          <Route path="/contact" element={<ContactFormView />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

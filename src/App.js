import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeView from './views/HomeView/HomeView';

const App = () => {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <HomeView />
      </div>
      <Footer />
    </>
  );
};

export default App;

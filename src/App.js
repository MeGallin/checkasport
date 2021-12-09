import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <h1>Cleaned Up</h1>
        <p>
          The style sheet has been reset and the all the default colours have
          been re-set.
        </p>
        <p>
          The style sheet has been reset and the all the default colours have
          been re-set.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default App;

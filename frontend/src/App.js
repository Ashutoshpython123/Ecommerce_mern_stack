import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'



import './App.css';
import Header from './Header';
import Footer from './Footer';
import Pages from './Pages';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
         <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;



import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Login from './components/login/login'; 
import Signup from './components/signup/signup';
import Seller from './components/seller/seller'; 
import Electro from './components/electro/electro';
import Accessoires from './components/accesoir/accesoire';
import Clothes from './components/clothes/clothes';
import Footer from './components/footer/footer';
import Panier from './components/panier/panier';
import './App.css'; 
import { UserProvider } from './UserContext';
import addDefaultProducts from './defaultProducts';

function App() {
  
  useEffect(() => {
    // Call the function to add default products
    addDefaultProducts();
  }, []);

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <div>
            <Navbar />
          </div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/electro" element={<Electro />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/accesoire" element={<Accessoires />} />
            <Route path="/panier" element={<Panier />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;

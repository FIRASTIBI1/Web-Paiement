// src/App.js
import React from 'react';
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

function App() {
  return (
    <Router>
      <div className="App">
      
      <div>
      <Navbar />
      </div>
        <Routes>
          <Route path="/home" element={<Home />} /> {/* Page d'accueil */}
          <Route path="/login" element={<Login />} /> {/* Page de connexion */}
          <Route path="/signup" element={<Signup />} /> {/* Page d'inscription */}
          <Route path="/seller" element={<Seller />} /> {/* Page d'inscription */}
          <Route path="/electro" element={<Electro />} /> {/* Page d'inscription */}
          <Route path="/clothes" element={<Clothes />} /> {/* Page d'inscription */}
          <Route path="/accesoire" element={<Accessoires />} /> {/* Page d'inscription */}
          <Route path="/panier" element={<Panier />} /> {/* Page d'inscription */}

        </Routes>

      </div>
      <div>
            <Footer />
          </div>
    </Router>
  );
}

export default App;
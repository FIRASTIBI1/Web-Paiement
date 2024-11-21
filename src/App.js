import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Team from './components/team/team';
import Dashboard from './components/dashboard/dashboard';
import Cursor from './cursor';
import Admin from './components/admin/admin';
import Carte from './components/carte/carte';
import Compte from './components/compte/compte';
import './App.css'; 

import { UserProvider } from './UserContext'; // Import UserProvider for user authentication
import { CartProvider } from './CartContext'; // Import CartProvider for cart functionality

function App() {
  return (
    <UserProvider>
      <CartProvider> {/* Wrap the app in CartProvider for global cart state */}
        <Router>
          <div className="App">
            <Cursor />
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} /> 
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/seller" element={<Seller />} />
              <Route path="/electro" element={<Electro />} />
              <Route path="/clothes" element={<Clothes />} />
              <Route path="/accesoire" element={<Accessoires />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/team" element={<Team />} />
              <Route path="/carte" element={<Carte />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/compte" element={<Compte />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

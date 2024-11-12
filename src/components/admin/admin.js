import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure Firestore instance is imported correctly
import './admin.css';

const Admin = () => {
    const [userEmail, setUserEmail] = useState('');
    const [productName, setProductName] = useState('');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
            setUsers(usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

            const productsRef = collection(db, 'products');
            const productsSnapshot = await getDocs(productsRef);
            setProducts(productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    const handleUserSearch = () => {
        const filteredUsers = users.filter(user =>
            user.email.toLowerCase().includes(userEmail.toLowerCase())
        );
        setUsers(filteredUsers);
    };

    const handleProductSearch = () => {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(productName.toLowerCase())
        );
        setProducts(filteredProducts);
    };

    return (
      
        <div className="crud-container">
         
          <br></br>
          <br></br>
          <br></br>
          <br></br><br></br>
          <br></br>
            <h2>Admin Space</h2>
            <img src="adlo.jpg" alt="Admin illustration" />

            {/* User Management */}
            <div className="management-section">
                <h3>User Management</h3>
                <br></br>
          <br></br>
          
                <input
                    type="text"
                    placeholder="User Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button onClick={handleUserSearch} className="read-button">Read</button>
                <button className="create-button">Create</button>
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
            </div>
       
            {/* Display Users */}
            <div className="data-display">
                {users.map(user => (
                    <div key={user.id} className="data-item">
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>

            {/* Product Management */}
            <div className="management-section">
                <h3>Product Management</h3>
                <br></br>
          <br></br>
          
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <button onClick={handleProductSearch} className="read-button">Read</button>
                <button className="create-button">Create</button>
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
            </div>

            {/* Display Products */}
            <div className="data-display">
                {products.map(product => (
                    <div key={product.id} className="data-item">
                        <p>Product Name: {product.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;

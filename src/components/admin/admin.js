import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assurez-vous que votre instance Firestore est bien configurée
import './admin.css';

const Admin = () => {
    const [userEmail, setUserEmail] = useState('');
    const [productName, setProductName] = useState('');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

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

    // Create User
    const handleCreateUser = async () => {
        if (userEmail.trim() === '') return alert('Email is required');
        try {
            const usersRef = collection(db, 'users');
            await addDoc(usersRef, { email: userEmail });
            alert('User created successfully');
            setUserEmail('');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Update User
    const handleUpdateUser = async () => {
        if (!selectedUserId || userEmail.trim() === '') return alert('Select a user to update');
        try {
            const userDoc = doc(db, 'users', selectedUserId);
            await updateDoc(userDoc, { email: userEmail });
            alert('User updated successfully');
            setSelectedUserId(null);
            setUserEmail('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete User
    const handleDeleteUser = async () => {
        if (!selectedUserId) return alert('Select a user to delete');
        try {
            const userDoc = doc(db, 'users', selectedUserId);
            await deleteDoc(userDoc);
            alert('User deleted successfully');
            setSelectedUserId(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Create Product
    const handleCreateProduct = async () => {
        if (productName.trim() === '') return alert('Product name is required');
        try {
            const productsRef = collection(db, 'products');
            await addDoc(productsRef, { name: productName });
            alert('Product created successfully');
            setProductName('');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Update Product
    const handleUpdateProduct = async () => {
        if (!selectedProductId || productName.trim() === '') return alert('Select a product to update');
        try {
            const productDoc = doc(db, 'products', selectedProductId);
            await updateDoc(productDoc, { name: productName });
            alert('Product updated successfully');
            setSelectedProductId(null);
            setProductName('');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete Product
    const handleDeleteProduct = async () => {
        if (!selectedProductId) return alert('Select a product to delete');
        try {
            const productDoc = doc(db, 'products', selectedProductId);
            await deleteDoc(productDoc);
            alert('Product deleted successfully');
            setSelectedProductId(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="crud-container">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Admin Space</h2>
            <img src="adlo.jpg" alt="Admin illustration" />

            {/* User Management */}
            <div className="management-section">
                <h3>User Management</h3>
                <input
                    type="text"
                    placeholder="User Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button onClick={handleCreateUser} className="create-button">Create</button>
                <button onClick={handleUpdateUser} className="update-button">Update</button>
                <button onClick={handleDeleteUser} className="delete-button">Delete</button>
            </div>

            {/* Display Users */}
            <div className="data-display">
                {users.map(user => (
                    <div
                        key={user.id}
                        className={`data-item ${selectedUserId === user.id ? 'selected' : ''}`}
                        onClick={() => {
                            setSelectedUserId(user.id);
                            setUserEmail(user.email);
                        }}
                    >
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>

            {/* Product Management */}
            <div className="management-section">
                <h3>Product Management</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <button onClick={handleCreateProduct} className="create-button">Create</button>
                <button onClick={handleUpdateProduct} className="update-button">Update</button>
                <button onClick={handleDeleteProduct} className="delete-button">Delete</button>
            </div>

            {/* Display Products */}
            <div className="data-display">
                {products.map(product => (
                    <div
                        key={product.id}
                        className={`data-item ${selectedProductId === product.id ? 'selected' : ''}`}
                        onClick={() => {
                            setSelectedProductId(product.id);
                            setProductName(product.name);
                        }}
                    >
                        <p>Product Name: {product.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;

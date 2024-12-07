import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assurez-vous que votre instance Firestore est bien configurée
import './admin.css';

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
            setUsers(usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    // Create User
    const handleCreateUser = async () => {
        if (email.trim() === '' || password.trim() === '') return alert('Email and Password are required');
        try {
            const usersRef = collection(db, 'users');
            await addDoc(usersRef, { email, password });
            alert('User created successfully');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Update User
    const handleUpdateUser = async () => {
        if (!email.trim() || !password.trim()) return alert('Email and Password are required for update');
        const user = users.find(user => user.email === email);
        if (!user) return alert('User not found');
        try {
            const userDoc = doc(db, 'users', user.id);
            await updateDoc(userDoc, { password });
            alert('Password updated successfully');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete User
    const handleDeleteUser = async () => {
        if (!email.trim()) return alert('Email is required to delete a user');
        const user = users.find(user => user.email === email);
        if (!user) return alert('User not found');
        try {
            const userDoc = doc(db, 'users', user.id);
            await deleteDoc(userDoc);
            alert('User deleted successfully');
            setEmail('');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
  
    return (
        <div className="crud-container" >
            <div className="logo-container">
                <img src="/logoo.jpg" alt="Logo" className="logo" />
            </div>
            <h2>Admin Space</h2>
            <div className="admin-photo">
                <img src="/adlo.jpg" alt="Admin" className="photo" />
            </div>

            <div className="crud-content">
                {/* User List */}
                <div className="user-list">
                    <h3>User List</h3>
                    <br></br>
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="data-item"
                            onClick={() => {
                                setEmail(user.email);
                                setSelectedUserId(user.id);
                            }}
                        >
                            <p>Email: {user.email}</p>
                        </div>
                    ))}
                </div>

                {/* Form Section */}
                
                <div className="management-section">
                
                    <h3>Manage Users</h3>
                    <br></br>

                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="button-group">
                        <button onClick={handleCreateUser} className="create-button">Create</button>
                        <button onClick={handleUpdateUser} className="update-button">Update</button>
                        <button onClick={handleDeleteUser} className="delete-button">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

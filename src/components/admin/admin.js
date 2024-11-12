import React, { useState, useEffect } from 'react';
import { db } from "../../firebase"; // Importation du fichier firebase.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Admin = () => {
  // États pour les produits, catégories et utilisateurs
  const [data, setData] = useState({
    products: [],
    categories: [],
    users: [],
  });
  const [newProduct, setNewProduct] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newUser , setNewUser ] = useState('');
  const [editing, setEditing] = useState({
    product: null,
    category: null,
    user: null,
  });

  // Fetch des données depuis Firestore
  useEffect(() => {
    const fetchData = async () => {
      const productSnapshot = await getDocs(collection(db, "products"));
      const categorySnapshot = await getDocs(collection(db, "categories"));
      const userSnapshot = await getDocs(collection(db, "users"));

      setData({
        products: productSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })),
        categories: categorySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })),
        users: userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })),
      });
    };

    fetchData();
  }, []);

  // Ajouter un produit
  const addProduct = async () => {
    if (newProduct.trim()) {
      await addDoc(collection(db, "products"), {
        name: newProduct,
        createdAt: new Date(),
      });
      setNewProduct('');
      alert('Produit ajouté');
    }
  };

  // Ajouter une catégorie
  const addCategory = async () => {
    if (newCategory.trim()) {
      await addDoc(collection(db, "categories"), {
        name: newCategory,
        createdAt: new Date(),
      });
      setNewCategory('');
      alert('Catégorie ajoutée');
    }
  };

  // Ajouter un utilisateur
  const addUser  = async () => {
    if (newUser .trim()) {
      await addDoc(collection(db, "users"), {
        name: newUser ,
        createdAt: new Date(),
      });
      setNewUser ('');
      alert('Utilisateur ajouté');
    }
  };

  // Mettre à jour une entité (produit, catégorie, utilisateur)
  const updateEntity = async (entity, entityId, updatedData) => {
    const docRef = doc(db, entity, entityId);
    await updateDoc(docRef, updatedData);
    alert(`${entity.slice(0, -1)} mis à jour`); // "Produit" -> "Produit mis à jour"
  };

  // Supprimer une entité (produit, catégorie, utilisateur)
  const deleteEntity = async (entity, id) => {
    const docRef = doc(db, entity, id);
    await deleteDoc(docRef);
    alert(`${entity.slice(0, -1)} supprimé`); // "Produit" -> "Produit supprimé"
  };

  return (
    <div className="admin-dashboard">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <h1>Page d'Administration</h1>

      {/* Section des produits */}
      <section className="admin-section">
        <h2>Produits</h2>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="Ajouter un nouveau produit"
        />
        <button className="action-button add-button" onClick={addProduct}>Ajouter</button>

        <div className="crud-list">
          {data.products.map((product) => (
            <div key={product.id} className="crud-item">
              {editing.product?.id === product.id ? (
                <>
                  <input
                    type="text"
                    value={editing.product.name}
                    onChange={(e) => setEditing({ ...editing, product: { ...editing.product, name: e.target.value } })}
                  />
                  <button className="action-button edit-button" onClick={() => updateEntity("products", product.id, { name: editing.product.name })}>Mettre à jour</button>
                </>
              ) : (
                <>
                  <span>{product.name}</span>
                  <button className="action-button edit-button" onClick={() => setEditing({ ...editing, product })}>Modifier</button>
                  <button className="action-button delete-button" onClick={() => deleteEntity("products", product.id)}>Supprimer</button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section des catégories */}
      <section>
        <h2>Catégories</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Ajouter une nouvelle catégorie"
        />
        <button onClick={addCategory}>Ajouter</button>

        <div className="crud-list">
          {data.categories.map((category) => (
            <div key={category.id} className="crud-item">
              {editing.category?.id === category.id ? (
                <>
                  <input
                    type="text"
                    value={editing.category.name}
                    onChange={(e) => setEditing({ ...editing, category: { ...editing.category, name: e.target.value } })}
                  />
                  <button onClick={() => updateEntity("categories", category.id, { name: editing.category.name })}>Mettre à jour</button>
                </>
              ) : (
                <>
                  <span>{category.name}</span>
                  <button onClick={() => setEditing({ ...editing, category })}>Modifier</button>
                  <button onClick={() => deleteEntity("categories", category.id)}>Supprimer</button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section des utilisateurs */}
      <section>
        <h2>Utilisateurs</h2>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Ajouter un nouvel utilisateur"
        />
        <button onClick={addUser}>Ajouter</button>

        <div className="crud-list">
          {data.users.map((user) => (
            <div key={user.id} className="crud-item">
              {editing.user?.id === user.id ? (
                <>
                  <input
                    type="text"
                    value={editing.user.name}
                    onChange={(e) => setEditing({ ...editing, user: { ...editing.user, name: e.target.value } })}
                  />
                  <button onClick={() => updateEntity("users", user.id, { name: editing.user.name })}>Mettre à jour</button>
                </>
              ) : (
                <>
                  <span>{user.name}</span>
                  <button onClick={() => setEditing({ ...editing, user })}>Modifier</button>
                  <button onClick={() => deleteEntity("users", user.id)}>Supprimer</button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;

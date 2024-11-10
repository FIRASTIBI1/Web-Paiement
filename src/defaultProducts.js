import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const addDefaultProducts = async () => {
    const electronics = [
        { name: 'Laptop', price: 500, description: 'A high-performance laptop', imageUrl: 'laptop_image_url' },
        { name: 'Smartphone', price: 300, description: 'Latest model smartphone', imageUrl: 'smartphone_image_url' },
    ];

    const accessories = [
        { name: 'Headphones', price: 50, description: 'Wireless headphones', imageUrl: 'headphones_image_url' },
        { name: 'Mouse', price: 20, description: 'Ergonomic mouse', imageUrl: 'mouse_image_url' },
    ];

    const clothes = [
        { name: 'T-Shirt', price: 25, description: 'Comfortable cotton t-shirt', imageUrl: 'tshirt_image_url' },
        { name: 'Jeans', price: 40, description: 'Slim-fit jeans', imageUrl: 'jeans_image_url' },
    ];

    // Add electronics as a document in the 'products' collection
    const electronicsDocRef = doc(db, 'products', 'electronics'); // 'electronics' is a document here
    await setDoc(electronicsDocRef, { items: electronics }); // Store products as an array in the 'electronics' document

    // Add accessories as a document in the 'products' collection
    const accessoriesDocRef = doc(db, 'products', 'accessories'); // 'accessories' is a document here
    await setDoc(accessoriesDocRef, { items: accessories }); // Store products as an array in the 'accessories' document

    // Add clothes as a document in the 'products' collection
    const clothesDocRef = doc(db, 'products', 'clothes'); // 'clothes' is a document here
    await setDoc(clothesDocRef, { items: clothes }); // Store products as an array in the 'clothes' document
};

export default addDefaultProducts;

import React, { useState, useEffect } from 'react';
import './cursor.css';

const Cursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [cursorHovered, setCursorHovered] = useState(false);

    // Mettre à jour la position du curseur
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.pageX, y: e.pageY });
        };

        // Ajouter un événement pour suivre la souris
        document.addEventListener('mousemove', handleMouseMove);

        // Nettoyer l'événement lors du démontage du composant
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Gérer les effets de survol (ex: agrandir le curseur sur les éléments hover)
    const handleMouseEnter = () => {
        setCursorHovered(true);
    };

    const handleMouseLeave = () => {
        setCursorHovered(false);
    };

    return (
        <>
            <div
                className={`cursor ${cursorHovered ? 'cursor-hovered' : ''}`}
                style={{
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                }}
            />
           
        </>
    );
};

export default Cursor;

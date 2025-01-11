// AlertPopup.jsx
import React, { useEffect } from 'react';

function AlertPopup({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Auto-close the alert after a few seconds
        }, 3000); // Duration in milliseconds (3 seconds)

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [onClose]);

    return (
        <div className={`fixed top-5 right-5 p-4 rounded-md shadow-lg 
            ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
            <p className="font-semibold">{message}</p>
        </div>
    );
}

export default AlertPopup;

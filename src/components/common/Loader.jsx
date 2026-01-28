import React, { useEffect, useState } from 'react';
import '../../styles/global.css'; // Ensure loader styles are here

const Loader = ({ name }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 5500); // Sync with CSS animation
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    // Extract first name for the loader text
    const firstName = name ? name.split(' ')[0].toUpperCase() : "LOADING";

    return (
        <div id="loader-overlay" style={{ opacity: visible ? 1 : 0, visibility: visible ? 'visible' : 'hidden' }}>
            <svg className="loader-svg">
                <text x="50%" y="60%" className="loader-text" id="loader-name">
                    {firstName}
                </text>
            </svg>
        </div>
    );
};

export default Loader;
// src/components/common/Loader.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/global.css';

const Loader = ({ name }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 5500);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    const firstName = name ? name.split(' ')[0].toUpperCase() : "LOADING";

    return (
        <div id="loader-overlay" style={{ opacity: visible ? 1 : 0, visibility: visible ? 'visible' : 'hidden' }}>
            {/* ADDED: viewBox="0 0 1320 300" 
               This sets a virtual canvas of 1320px wide by 300px high.
               The SVG will now scale its contents to fit the screen width 
               while maintaining the 150px font proportions relative to this box.
            */}
            <svg 
                className="loader-svg" 
                viewBox="0 0 1320 300" 
                preserveAspectRatio="xMidYMid meet"
            >
                <text x="50%" y="60%" className="loader-text" id="loader-name">
                    {firstName}
                </text>
            </svg>
        </div>
    );
};

export default Loader;
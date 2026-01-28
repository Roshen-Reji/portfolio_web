import React from 'react';

const BackgroundLines = () => {
    return (
        <div className="lines-container">
            {[...Array(13)].map((_, i) => (
                <div key={i} className="line"></div>
            ))}
        </div>
    );
};

export default BackgroundLines;
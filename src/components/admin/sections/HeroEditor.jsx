import React from 'react';

const HeroEditor = ({ data, update }) => {
    return (
        <div className="view-section active">
            <div className="header">
                <h1 className="title">Home & Stats</h1>
                <p className="subtitle">Control the first impression. Stats update automatically.</p>
            </div>

            <div className="panel">
                <div className="input-group">
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        value={data?.name || ''} 
                        onChange={(e) => update('name', e.target.value)} 
                    />
                </div>
                <div className="grid">
                    <div className="input-group">
                        <label>Main Title</label>
                        <input 
                            type="text" 
                            value={data?.title || ''} 
                            onChange={(e) => update('title', e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Current Year</label>
                        <input 
                            type="text" 
                            value={data?.year || ''} 
                            onChange={(e) => update('year', e.target.value)} 
                        />
                    </div>
                </div>
            </div>
            
            <div className="header" style={{ marginTop: '4rem' }}>
                <h1 className="title" style={{ fontSize: '1.5rem' }}>Live Statistics</h1>
            </div>
            <div className="grid">
                <StatBox label="Certificates" val={data?.stats?.certs} />
                <StatBox label="Skills" val={data?.stats?.skills} />
                <StatBox label="Projects" val={data?.stats?.projects} />
            </div>
        </div>
    );
};

const StatBox = ({ label, val }) => (
    <div className="panel" style={{ textAlign: 'center' }}>
        <label>{label}</label>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
            {val || 0}
        </div>
    </div>
);

export default HeroEditor;
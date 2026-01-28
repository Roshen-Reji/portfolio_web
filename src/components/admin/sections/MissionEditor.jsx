import React from 'react';

const MissionEditor = ({ data, update }) => {
    return (
        <div className="view-section active">
            <div className="header">
                <h1 className="title">Mission Control</h1>
            </div>
            
            <div className="panel">
                <div className="input-group">
                    <label>Headline Title</label>
                    <input 
                        type="text" 
                        value={data?.title || ''}
                        onChange={(e) => update('title', e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Mission Statement</label>
                    <textarea 
                        value={data?.text || ''}
                        onChange={(e) => update('text', e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Profile Image URL</label>
                    <input 
                        type="text" 
                        value={data?.image || ''}
                        onChange={(e) => update('image', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MissionEditor;
import React, { useState } from 'react';

const LinkTool = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const convert = () => {
        // 1. Regex to find the ID (works for /d/ID and id=ID)
        let m = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (!m) {
            m = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        }

        if (m && m[1]) {
            const fileId = m[1];
            // FIX: Use the 'lh3' domain which is much more reliable for <img> tags
            setResult(`https://lh3.googleusercontent.com/d/${fileId}`);
        } else {
            setResult("Invalid Link. Please paste a full Google Drive sharing link.");
        }
    };

    return (
        <div className="view-section active">
            <div className="header">
                <h1 className="title">Link Fixer (Embed Mode)</h1>
                <p className="subtitle">Generate high-performance embed links.</p>
                
                <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(255, 200, 0, 0.1)', borderLeft: '3px solid #fbbf24', borderRadius: '4px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#fbbf24', margin: 0 }}>
                        <strong>⚠️ IMPORTANT:</strong> Ensure the file on Google Drive is shared as <strong>"Anyone with the link"</strong>.
                    </p>
                </div>
            </div>

            <div className="panel">
                <div className="input-group" style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Paste Drive Link..." 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                    />
                    <button className="btn-publish" onClick={convert}>GENERATE</button>
                </div>
                
                {result && (
                    <div className="preview-box" style={{ 
                        display: 'block', 
                        marginTop: '1.5rem', 
                        padding: '1rem',
                        background: '#0d1b21',
                        border: '1px solid #1A7A85',
                        borderRadius: '8px',
                        wordBreak: 'break-all'
                    }}>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>Embed Link (Copy this):</p>
                        <div style={{ color: '#4fd1c5', userSelect: 'all', fontFamily: 'monospace' }}>
                            {result}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkTool;
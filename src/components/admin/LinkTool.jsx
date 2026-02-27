import React, { useState } from 'react';

const LinkTool = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(false);

    const convert = () => {
        setError(false);
        setResult(null);

        // 1. Validation: Check if the link looks like a Google Drive file link
        const isDriveLink = input.includes('drive.google.com');
        
        // 2. Image validation: Since Drive links don't always end in extensions, 
        // we check for common image patterns or keywords if applicable.
        // For strict extension checking (if the user pastes a direct URL):
        const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|avif|bmp|svg)/i.test(input);

        if (!isDriveLink) {
            setError(true);
            setResult("Invalid Link. Please paste a full Google Drive sharing link.");
            return;
        }

        // 3. Extraction Logic
        // Regex to find the ID (works for /d/ID and id=ID)
        let m = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (!m) {
            m = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        }

        if (m && m[1]) {
            const fileId = m[1];
            // Using the 'lh3' googleusercontent domain for reliable embedding in <img> tags
            setResult(`https://lh3.googleusercontent.com/d/${fileId}`);
        } else {
            setError(true);
            setResult("Could not extract File ID. Ensure the link is a valid Google Drive share link.");
        }
    };

    return (
        <div className="view-section active">
            <div className="header">
                <h1 className="title">Link Fixer (Image Mode)</h1>
                <p className="subtitle">Convert Google Drive links into direct image embed URLs.</p>
                
                <div style={{ 
                    marginTop: '1rem', 
                    padding: '10px', 
                    background: 'rgba(255, 200, 0, 0.1)', 
                    borderLeft: '3px solid #fbbf24', 
                    borderRadius: '4px' 
                }}>
                    <p style={{ fontSize: '0.85rem', color: '#fbbf24', margin: 0 }}>
                        <strong>⚠️ IMPORTANT:</strong> The image must be shared as <strong>"Anyone with the link"</strong> in Google Drive for the embed to work.
                    </p>
                </div>
            </div>

            <div className="panel">
                <div className="input-group" style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Paste Google Drive Image Link..." 
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
                        border: `1px solid ${error ? '#ff4757' : '#1A7A85'}`,
                        borderRadius: '8px',
                        wordBreak: 'break-all'
                    }}>
                        <p style={{ 
                            fontSize: '0.8rem', 
                            color: error ? '#ff4757' : '#888', 
                            marginBottom: '0.5rem' 
                        }}>
                            {error ? 'Error:' : 'Embed Link (Copy this):'}
                        </p>
                        <div style={{ 
                            color: error ? '#fff' : '#4fd1c5', 
                            userSelect: 'all', 
                            fontFamily: 'monospace',
                            fontSize: '0.9rem'
                        }}>
                            {result}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkTool;
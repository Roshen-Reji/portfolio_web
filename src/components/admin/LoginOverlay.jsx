// src/components/admin/LoginOverlay.jsx
import React, { useState } from 'react';

const LoginOverlay = ({ onLogin }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = () => {
        if(user && pass) onLogin(user, pass);
    };

    return (
        <div id="login-screen">
            <div className="login-box">
                {/* Decorative Neon Icon */}
                <div style={{
                    fontSize: '3rem', 
                    marginBottom: '1rem', 
                    color: 'var(--neon-cyan)',
                    filter: 'drop-shadow(0 0 15px var(--neon-cyan))'
                }}>
                    ⌬
                </div>

                <h2 className="login-title">Admin Login</h2>
                
                <input 
                    type="text" 
                    className="login-input" 
                    placeholder="Username"
                    value={user} 
                    onChange={e => setUser(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
                <input 
                    type="password" 
                    className="login-input" 
                    placeholder="Password"
                    value={pass} 
                    onChange={e => setPass(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
                
                <button className="btn-login" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};
export default LoginOverlay;
import React, { useState } from 'react';

const LoginOverlay = ({ onLogin }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div id="login-screen">
            <div className="login-box">
                <h2 className="login-title">Secure Access</h2>
                <input 
                    type="text" className="login-input" placeholder="Username"
                    value={user} onChange={e => setUser(e.target.value)}
                />
                <input 
                    type="password" className="login-input" placeholder="Password"
                    value={pass} onChange={e => setPass(e.target.value)}
                />
                <button className="btn-login" onClick={() => onLogin(user, pass)}>
                    UNLOCK DASHBOARD
                </button>
            </div>
        </div>
    );
};
export default LoginOverlay;
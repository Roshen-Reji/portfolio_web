// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkCredentials } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check session storage on mount
    useEffect(() => {
        const session = sessionStorage.getItem('isAdmin');
        if (session === 'true') {
            setIsAdmin(true);
        }
        setLoading(false);
    }, []);

    const login = (user, pass) => {
        if (checkCredentials(user, pass)) {
            sessionStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            return { success: true };
        } else {
            return { success: false, error: 'Invalid Credentials' };
        }
    };

    const logout = () => {
        sessionStorage.removeItem('isAdmin');
        setIsAdmin(false);
    };

    const value = {
        isAdmin,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
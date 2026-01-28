// src/components/admin/Sidebar.jsx
import React, { useState } from 'react';
import '../../styles/admin.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu

    const tabs = [
        { id: 'home', icon: '⌂', label: 'Overview' },
        { id: 'mission', icon: '◎', label: 'Mission' },
        { id: 'skills', icon: '⚡', label: 'Skills' },
        { id: 'projects', icon: '★', label: 'Projects' },
        { id: 'certs', icon: '🎖', label: 'Certificates' },
        { id: 'socials', icon: '∞', label: 'Socials' },
        { id: 'tools', icon: '🔗', label: 'Link Tools' },
    ];

    const logout = () => {
        sessionStorage.removeItem('isAdmin');
        window.location.reload();
    };

    // Close menu when a link is clicked
    const handleTabClick = (id) => {
        setActiveTab(id);
        setIsOpen(false); 
    };

    return (
        <nav className={`sidebar ${isOpen ? 'expanded' : ''}`}>
            {/* Mobile Header: Brand + Toggle Button */}
            <div className="sidebar-header-mobile">
                <div className="brand">
                    <span style={{color: 'var(--neon-cyan)', fontSize: '2rem'}}>●</span> 
                    ADMIN
                </div>
                
                {/* Hamburger Button (Hidden on Desktop via CSS) */}
                <button 
                    className="menu-toggle" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>
            
            <div className="nav-menu">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        <span className="nav-icon">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}

                {/* Mobile Logout (Hidden on Desktop via CSS) */}
                <button className="nav-btn mobile-logout" onClick={logout}>
                    <span className="nav-icon" style={{color: '#ff4757'}}>⏻</span>
                    Logout
                </button>
            </div>

            {/* Desktop Profile Card (Hidden on Mobile via CSS) */}
            <div className="profile-card desktop-only">
                <div>
                    <h4 style={{color:'#fff', fontWeight: 800}}>Admin User</h4>
                    <p style={{color:'rgba(255,255,255,0.5)', fontSize: '0.75rem'}}>Super Access</p>
                </div>
                <button className="btn-delete" onClick={logout}>
                    LOGOUT
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
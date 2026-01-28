import React from 'react';
import '../../styles/admin.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', icon: '🏠', label: 'Overview' },
        { id: 'mission', icon: '🚀', label: 'Mission' },
        { id: 'skills', icon: '⚡', label: 'Skills' },
        { id: 'projects', icon: '📂', label: 'Projects' },
        { id: 'certs', icon: '🎓', label: 'Certificates' },
        { id: 'socials', icon: '🌍', label: 'Socials' },
        { id: 'tools', icon: '🛠', label: 'Link Tools' },
    ];

    const logout = () => {
        sessionStorage.removeItem('isAdmin');
        window.location.reload();
    };

    return (
        <nav className="sidebar">
            <div className="brand"><div className="brand-dot"></div> ADMIN PANEL</div>
            
            <div className="nav-menu">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className="profile-card">
                <div className="meta">
                    <h4>Admin User</h4>
                    <p>Super Access</p>
                </div>
                <button className="btn-delete" onClick={logout} style={{marginLeft: 'auto'}}>Logout</button>
            </div>
        </nav>
    );
};

export default Sidebar;
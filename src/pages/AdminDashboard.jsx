// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchPortfolioData, savePortfolioData } from '../services/api';
import { useAuth } from '../context/AuthContext';

// --- COMPONENTS ---
import LoginOverlay from '../components/admin/LoginOverlay';
import Sidebar from '../components/admin/Sidebar';
import HeroEditor from '../components/admin/sections/HeroEditor';
import MissionEditor from '../components/admin/sections/MissionEditor';
import ListEditor from '../components/admin/sections/ListEditor';
import LinkTool from '../components/admin/LinkTool';

// --- STYLES ---
import '../styles/admin.css';

const AdminDashboard = () => {
    // --- AUTH CONTEXT ---
    // We use the global AuthContext instead of local state
    const { isAdmin, login } = useAuth();

    // --- LOCAL STATE ---
    const [activeTab, setActiveTab] = useState('home');
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("Ready");

    // --- INITIAL DATA LOAD ---
    useEffect(() => {
        if (isAdmin) {
            loadData();
        }
    }, [isAdmin]);

    // --- ACTIONS ---
    const loadData = async () => {
        setStatus("Loading...");
        const result = await fetchPortfolioData();
        setData(result);
        setStatus("Ready");
    };

    const handleSave = async () => {
        if (!data) return;
        setStatus("Saving...");
        const result = await savePortfolioData(data);
        
        if (result.success) {
            setStatus("Published!");
            setTimeout(() => setStatus("Ready"), 2000);
        } else {
            setStatus("Error Saving");
            console.error(result.error);
        }
    };

    // --- STATE UPDATERS ---

    // 1. For nested objects (Hero, Mission)
    const updateSection = (section, key, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    // 2. For Lists (Skills, Projects, Certs, Socials)
    const updateList = (section, index, key, value) => {
        setData(prev => {
            const newList = [...prev[section]];
            newList[index] = { ...newList[index], [key]: value };
            return { ...prev, [section]: newList };
        });
    };

    const addListItem = (section, template) => {
        setData(prev => ({
            ...prev,
            [section]: [...prev[section], template]
        }));
    };

    const deleteListItem = (section, index) => {
        if (!window.confirm("Delete this item?")) return;
        setData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    // --- RENDER CONTENT SWITCHER ---
    const renderContent = () => {
        if (!data) return <div className="loading-state">Loading Data...</div>;

        switch (activeTab) {
            case 'home':
                return <HeroEditor data={data.hero} update={(k, v) => updateSection('hero', k, v)} />;
            
            case 'mission':
                return <MissionEditor data={data.mission} update={(k, v) => updateSection('mission', k, v)} />;

            case 'skills':
                return (
                    <ListEditor 
                        title="Skill Stack"
                        items={data.skills}
                        fields={[
                            { key: 'icon', label: 'Icon (Emoji)', type: 'text' },
                            { key: 'title', label: 'Skill Name', type: 'text' },
                            { key: 'desc', label: 'Description', type: 'textarea' }
                        ]}
                        onUpdate={(i, k, v) => updateList('skills', i, k, v)}
                        onAdd={() => addListItem('skills', { icon: '⚡', title: 'New Skill', desc: '...' })}
                        onDelete={(i) => deleteListItem('skills', i)}
                    />
                );

            case 'projects':
                return (
                    <ListEditor 
                        title="Projects Portfolio"
                        items={data.projects}
                        fields={[
                            { key: 'label', label: 'Category Label', type: 'text' },
                            { key: 'title', label: 'Project Title', type: 'text' },
                            { key: 'desc', label: 'Description', type: 'textarea' },
                            { key: 'link', label: 'Project URL', type: 'text' },
                            { key: 'color', label: 'Accent Color', type: 'color' }
                        ]}
                        onUpdate={(i, k, v) => updateList('projects', i, k, v)}
                        onAdd={() => addListItem('projects', { label: 'Web', title: 'New Project', desc: '...', link: '#', color: '#22d3ee' })}
                        onDelete={(i) => deleteListItem('projects', i)}
                    />
                );

            case 'certs':
                return (
                    <ListEditor 
                        title="Certifications"
                        items={data.certificates}
                        fields={[
                            { key: 'title', label: 'Certificate Name', type: 'text' },
                            { key: 'issuer', label: 'Issuer', type: 'text' },
                            { key: 'year', label: 'Year', type: 'text' },
                            { key: 'image', label: 'Image URL', type: 'text' }
                        ]}
                        onUpdate={(i, k, v) => updateList('certificates', i, k, v)}
                        onAdd={() => addListItem('certificates', { title: 'New Cert', issuer: 'Udemy', year: '2025', image: '' })}
                        onDelete={(i) => deleteListItem('certificates', i)}
                    />
                );

            case 'socials':
                return (
                    <ListEditor 
                        title="Social Links"
                        items={data.socials}
                        fields={[
                            { key: 'platform', label: 'Platform Name', type: 'text' },
                            { key: 'url', label: 'Profile URL', type: 'text' },
                            { key: 'desc', label: 'Hover Text', type: 'text' }
                        ]}
                        onUpdate={(i, k, v) => updateList('socials', i, k, v)}
                        onAdd={() => addListItem('socials', { platform: 'GitHub', url: '#', desc: 'Check Code' })}
                        onDelete={(i) => deleteListItem('socials', i)}
                    />
                );

            case 'tools':
                return <LinkTool />;

            default:
                return null;
        }
    };

    // --- MAIN RENDER ---
    
    // 1. Not Logged In -> Show Login Overlay
    // We pass the global 'login' function to the overlay
    if (!isAdmin) {
        return <LoginOverlay onLogin={(u, p) => {
            const res = login(u, p);
            if (!res.success) alert(res.error);
        }} />;
    }

    // 2. Logged In -> Show Dashboard
    return (
        <div className="admin-body">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="main">
                {renderContent()}
            </main>
            
            <div className="dock">
                <div id="statusMsg" className={status === "Published!" ? "success-text" : ""}>
                    {status}
                </div>
                <button className="btn-publish" onClick={handleSave} disabled={status === "Saving..."}>
                    {status === "Saving..." ? "SAVING..." : "PUBLISH CHANGES"}
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
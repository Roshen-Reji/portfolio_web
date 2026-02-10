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
    const { isAdmin, login } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("Ready");

    useEffect(() => {
        if (isAdmin) {
            loadData();
        }
    }, [isAdmin]);

    const loadData = async () => {
        setStatus("Loading...");
        const result = await fetchPortfolioData();
        setData(result);
        setStatus("Ready");
    };

    const handleSave = async () => {
        if (!data) return;

        // Helper to check if a string is a valid image URL
        const isImage = (url) => {
            if (!url) return true; // Allow empty
            return /\.(jpg|jpeg|png|gif|webp|avif|svg)/i.test(url) || url.includes('googleusercontent.com');
        };

        // Validate Mission Image
        if (!isImage(data.mission.image)) {
            alert("Error: The Mission image URL is not a valid image link.");
            return;
        }

        // Validate Certificate Images
        const invalidCert = data.certificates.find(cert => !isImage(cert.image));
        if (invalidCert) {
            alert(`Error: Certificate "${invalidCert.title}" has an invalid image link.`);
            return;
        }

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

    const updateSection = (section, key, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    // --- UPDATED STATE UPDATER WITH VALIDATION ---
    const updateList = (section, index, key, value) => {
        // 1. Socials Validation logic
        if (section === 'socials' && key === 'url') {
            const item = data.socials[index];
            const platform = item.platform.toLowerCase();
            
            const rules = {
                github: {
                    pattern: /github\.com/i,
                    error: "Invalid GitHub link. Please enter a valid github.com URL."
                },
                linkedin: {
                    pattern: /linkedin\.com/i,
                    error: "Invalid LinkedIn link. Please enter a valid linkedin.com URL."
                },
                instagram: {
                    pattern: /instagram\.com/i,
                    error: "Invalid Instagram link. Please enter a valid instagram.com URL."
                },
            };

            // Only validate if a rule exists for this platform and the value isn't empty
            if (rules[platform] && value !== "" && !rules[platform].pattern.test(value)) {
                alert(rules[platform].error);
                return; // Block the state update
            }
        }

        // 2. Certificates Year Validation
        if (section === 'certificates' && key === 'year') {
            const currentYear = new Date().getFullYear();
            const inputYear = parseInt(value);

            if (inputYear > currentYear) {
                alert(`Invalid Year: ${value}. You cannot enter a future year.`);
                return; 
            }
        }
        //3.No repetition For Skills
        if (section === 'skills' && key === 'title') {
        const isDuplicate = data.skills.some((skill, i) => 
            i !== index && skill.title.toLowerCase() === value.toLowerCase().trim()
        );

        if (isDuplicate && value !== "") {
            alert(`The skill "${value}" already exists in your list.`);
            return; // Block the update
        }
    }

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
                       onAdd={() => {
                            const defaultTitle = "New Skill";
                            const exists = data.skills.some(s => s.title === defaultTitle);
                            
                            if (exists) {
                                alert("Please rename the existing 'New Skill' before adding another.");
                            } else {
                                addListItem('skills', { icon: '⚡', title: defaultTitle, desc: '...' });
                            }
                        }}
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

    if (!isAdmin) {
        return <LoginOverlay onLogin={(u, p) => {
            const res = login(u, p);
            if (!res.success) alert(res.error);
        }} />;
    }

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
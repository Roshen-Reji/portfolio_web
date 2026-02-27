import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { fetchPortfolioData } from '../services/api';
import Navbar from '../components/common/Navbar';
import Loader from '../components/common/Loader';
import BackgroundLines from '../components/common/BackgroundLines';
import Hero from '../components/portfolio/Hero';
import Mission from '../components/portfolio/Mission';
import Skills from '../components/portfolio/Skills';
import Projects from '../components/portfolio/Projects';
import Certificates from '../components/portfolio/Certificates'; // Ensure these are imported
import Socials from '../components/portfolio/Socials';           // Ensure these are imported
import Footer from '../components/common/Footer';

const Portfolio = () => {
    const navigate = useNavigate(); // 2. Initialize hook
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const result = await fetchPortfolioData();
            setData(result);
            setTimeout(() => setLoading(false), 2000); 
        };
        load();
    }, []);
if (loading || !data) return <Loader name={data?.hero?.name || "ROSHEN REJI"} />;
    return (
        <main>
            <BackgroundLines />
            <Navbar />
            
            {/* 3. ADMIN BUTTON MOVED HERE (Outside of Hero) */}
            <div className="admin-wrapper">
                <button className="admin-btn" onClick={() => navigate('/admin')}>
                    ADMIN
                </button>
            </div>

            <Hero data={data?.hero} />
            <Mission data={data?.mission} />
            <Skills data={data?.skills} />
            <Certificates data={data?.certificates} />
            <Projects data={data?.projects} />
            <Socials data={data?.socials} />
            <Footer />
        </main>
    );
};

export default Portfolio;
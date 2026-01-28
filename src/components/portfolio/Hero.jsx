import React from 'react';
// You can remove useNavigate and the import if you want, as it's no longer used here
import '../../styles/global.css'; 

const Hero = ({ data }) => {
    return (
        <section className="hero-section" id="home">
            {/* Admin Button Removed from here */}

            <div className="hero-content">
                <p className="text-cursive">{data?.name}</p>
                <h1 className="text-striped">{data?.title}</h1>
                <p className="text-cursive">{data?.year}</p>
            </div>

            <div className="stats-container">
                <StatItem label="Certificates" count={data?.stats?.certs} />
                <StatItem label="Skills" count={data?.stats?.skills} />
                <StatItem label="Projects" count={data?.stats?.projects} />
            </div>
        </section>
    );
};

const StatItem = ({ label, count }) => (
    <div className="stat-item">
        <div className="counter-sphere">{count}</div>
        <span className="stat-label">{label}</span>
    </div>
);

export default Hero;
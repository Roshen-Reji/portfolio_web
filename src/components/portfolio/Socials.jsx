// src/components/portfolio/Socials.jsx
import React, { useEffect, useRef } from 'react';

// Simple icon mapping helper
const getIcon = (platform) => {
    const p = platform.toLowerCase();
    // You can replace these SVGs with proper react-icons later
    if(p.includes('git')) return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
    if(p.includes('linkedin')) return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
    return <span style={{fontSize: '30px'}}>🔗</span>;
};

const Socials = ({ data }) => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollDist = rect.height - viewportHeight;
            let percentage = -rect.top / scrollDist;

            percentage = Math.max(0, Math.min(1, percentage));

            const totalCards = data?.length || 0;
            const activeIndex = percentage * (totalCards - 1);

            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                let k = i - activeIndex;
                let x = 0, scale = 1, opacity = 1, blur = 0, rotateY = 0, zIndex = 0;

                if (k < 0) {
                    x = k * 600;
                    opacity = 1 + k;
                    rotateY = k * 20;
                    blur = -k * 10;
                    zIndex = totalCards + Math.floor(k);
                } else {
                    x = k * 50;
                    scale = 1 - (k * 0.2);
                    opacity = 1 - (k * 0.5);
                    blur = k * 5;
                    zIndex = totalCards - i;
                }
                if (opacity < 0) opacity = 0;

                card.style.transform = `translateX(${x}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`;
                card.style.opacity = opacity;
                card.style.filter = `blur(${blur}px)`;
                card.style.zIndex = zIndex;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [data]);

    return (
        <section className="socials-section" id="socials" ref={sectionRef}>
            <div className="social-sticky-wrapper">
                <div className="social-header-absolute">
                    <span className="label-pill">Connect</span>
                    <h2 className="section-title">Network</h2>
                </div>
                <div className="social-track">
                    {data?.map((soc, index) => (
                        <a 
                            key={index}
                            href={soc.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="soc-card" 
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="soc-glass-depth"></div>
                            <div className="soc-content">
                                <div className="soc-icon">{getIcon(soc.platform)}</div>
                                <h3 className="soc-title">{soc.platform}</h3>
                                <p className="soc-desc">{soc.desc}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Socials;